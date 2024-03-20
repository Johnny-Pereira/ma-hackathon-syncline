import dash
from dash import html, dcc, callback, Input, Output, State
import plotly.express as px
import requests
from bs4 import BeautifulSoup
from textblob import TextBlob
from newspaper import Article
import nltk
from transformers import pipeline, DistilBertTokenizer
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import io
import base64
import plotly.graph_objs as go
import pandas as pd

# Initialize necessary components
nltk.download('punkt')
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
app = dash.Dash(__name__)

# App layout
app.layout = html.Div([
    html.H1('InsightQuantum', style={'text-align': 'center', 'font-weight': '1000', 'font-size': '40px', 'color': 'white', 'background-color': '#0a1264', 'width': '100%', 'font-family': 'Inter', 'padding': '20px'}),
    # input
    html.Div([
        dcc.Input(
            id='url-input', 
            type='text', 
            placeholder="Enter Article URL here...",
            style={
                'border': '2px solid #ddd',  # Style the border of the input
                'borderRadius': '4px',  # Round the corners of the input
                'paddingRight': '50px',  # Provide space inside the input for the button
                'paddingLeft': '10px',  # Padding on the left for text
                'height': '38px',  # Match the height of the button
                'lineHeight': '38px',  # Center text vertically
                'width': '500px',  # Width of the input field
            }
        ),
        # Button inside input box
        html.Button(
            'Go', 
            id='submit-val',
            n_clicks=0,
            style={
                'position': 'absolute',  # Position the button over the input
                'top': '2px',  # Align the top of the button with the input field
                'right': '2px',  # Align the right of the button with the input field
                'height': '39px',  # Height of the button
                'border': '1px solid #ddd',  # Style the border of the button
                'borderRadius': '4px',  # Round the corners of the button
                'background': '#007bff',  # Background color of the button
                'color': 'white',  # Text color of the button
                'padding': '0 10px',  # Padding inside the button
                'box-sizing': 'border-box',
                'background-color': '#005EFF',
                'font-family': 'Inter',
                'font-weight': 'bold',
                'letter-spacing': '1px',
                'font-size': '14px',
            }
        ),
    ], style={
         'position': 'relative',  # Allows absolute positioning within the div
         'display': 'inline-block',  # Keeps the div block inline
         'paddingLeft': '476px',
    }),

    html.Div([
        html.Div([
            html.H2('Summary', style={'fontWeight': '500', 'font-size': '25px', 'color': '#0a1264'}),
            html.Span(id='article-summary', style={'font-size': '15px', 'padding-top': '10px'}),
            html.Span([
                html.P("Title: ", id='article-title'),
                html.P("Author: ", id='article-authors', style={"color": "#000000"}),
                html.P("Publication Date: ", id="article-date", style={"color": "#000000"}),
                html.P("Original Length of Article: ", id='original-length', style={"color": "#000000"}),
                html.P("Summarized Length: ", id='summary-length', style={"color": "#000000"})
            ], style={'position': 'absolute', 'left': '0', 'bottom': '0', 'font-size': '15px', 'padding': '10px'})
        ], 
        style={
            'position': 'relative',
            'flex': '50%',
            'font-family': 'Inter',
            'padding': '10px',
        }),  
        html.Div([
            html.H1("Outlook", id="sentiment-output", style={'font-weight': '500', 'font-size': '25px', 'color': '#0a1264', 'padding': '10px'}),
            dcc.Graph(
                figure=go.Figure(
                    data=[
                        go.Pie(
                            labels=['Positive', 'Neutral'],
                            values=[28.8, 71.2],
                            hoverinfo='label+percent',  # Display label and percentage on hover
                            textinfo='value',           # Display only the value on the chart
                            textfont=dict(size=20),     # Font size of the text
                            marker=dict(colors=['blue', 'silver'])
                        )
                    ]
                ), style={'display': 'inline-block'}
            )
        ], 
        style={
            'flex': '50%',
            'font-family': 'Inter',
        }),
    ], style={'display': 'flex'}),
    html.Div([html.Img(id='wordcloud-image')
], style={'display': 'flex', 'flex-direction': 'row', 'justify-content': 'center', 'align-items': 'center'})
], style={'font-family': 'Inter'})

# Callback for the Dash app
@callback(
    [Output('article-title', 'children'),
     Output('article-authors', 'children'),
     Output('article-date', 'children'),
     Output('original-length', 'children'),
     Output('summary-length', 'children'),
     Output('article-summary', 'children'),
     Output('sentiment-output', 'children'),
     Output('wordcloud-image', 'src')],
    Input('submit-val', 'n_clicks'),
    State('url-input', 'value')
)

def update_output(n_clicks, url):
    if n_clicks > 0 and url:
        # Fetch and process the article
        response = requests.get(url, verify=False)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = ' '.join(p.text for p in soup.find_all('p'))
        article = Article(url)
        article.set_html(response.text)
        article.parse()
        # Summarize the article
        summary = generate_summary(article.text)
        # Analyze sentiment
        text_chunks = tokenize_and_chunk_text(article.text)
        overall_sentiment_score = analyze_sentiment(text_chunks)
        # Generate word cloud
        wordcloud_image = generate_wordcloud(article.text)

        return (f"Title: {article.title}",
                f"Authors: {', '.join(article.authors)}",
                f"Publication Date: {article.publish_date}",
                f"Length of Original Article: {len(article.text.split())} words",
                f"Length of Summarized Article: {len(summary.split())} words",
                f"{summary}",
                f"Overall Sentiment Score: {overall_sentiment_score:.2f}",
                wordcloud_image)
                # pie_chart)
    return "", "", "", "", "", "", "", ""

def generate_summary(text):
    summary_text = summarizer(text, max_length=150, min_length=30, do_sample=False)[0]['summary_text']
    return summary_text

def tokenize_and_chunk_text(text, max_length=510):
    token_ids = tokenizer.encode(text, add_special_tokens=False)
    chunks = [token_ids[i:i + max_length] for i in range(0, len(token_ids), max_length)]
    chunk_texts = [tokenizer.decode(chunk, add_special_tokens=True) for chunk in chunks]
    return chunk_texts

def analyze_sentiment(text_chunks):
    sentiment_scores = [sentiment_analyzer(chunk)[0]['score'] for chunk in text_chunks]
    overall_sentiment_score = sum(sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0
    return overall_sentiment_score

def generate_wordcloud(text):
    wordcloud = WordCloud(width=800, height=400, background_color='white', color_func=lambda *args, **kwargs: "blue").generate(text)
    image = io.BytesIO()
    wordcloud.to_image().save(image, format='PNG')
    image.seek(0)
    image_b64 = base64.b64encode(image.getvalue()).decode()
    return f'data:image/png;base64,{image_b64}'

if __name__ == '__main__':
    app.run_server(debug=True)