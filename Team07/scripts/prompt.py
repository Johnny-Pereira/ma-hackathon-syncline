import os
import openai
import json
import pandas as pd
with open("config.json") as file:
    config = json.load(file)
openai.api_key = config.get('key')
os.environ['OPENAI_API_KEY'] = config["key"]
def prompt_gpt(df):
    # thread = df['Cleaned Text'].values[0]  #  The 'text' column contains the message thread
    response = openai.ChatCompletion.create(
                model = "gpt-4-1106-preview",
                temperature = 0,
                messages=[
                        {"role": "system", "content": "You are helping me parse slack help channel messages by removing irrelevant information."},
                        {"role": "user", "content": 
                        f"""
        Here's a data frame containing messages: {df}. Please 3 create prompts and responses (with sources from datafram) based on the following guidelines:
        (a) Popular questions and answers from the data frame
        (b) Common issues and solutions from the data frame
        (c) General information and responses from the data frame
        (d) Include sources for the response from the data frame
        (e) Include the most relevant information from the data frame
        (f) Respones from the dataframe accuratley and concisely answer questions
        (g) Include any relevant code if necessary
        """},
        ],
        n = 1
        )
        
    response_text = response.choices[0]["message"]["content"]

    return response_text

def get_clean_messages_prompts(cleaned_messages_file_path):
    df = pd.read_csv(cleaned_messages_file_path, encoding='utf-8')
    return prompt_gpt(df)

def main():
    print(get_clean_messages_prompts("cleaned_messages.csv"))

if __name__ == "__main__":
    main()