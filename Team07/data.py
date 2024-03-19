import pandas as pd

def read_csv(file_path):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(file_path, encoding='utf-8')

    # Select the second column (assuming it's named 'column2')
    df_adjusted = df.iloc[:, 1]

    # Convert the Series back into a DataFrame
    df_single_column = df_adjusted.to_frame()
    return df_single_column

def prompt(thread):
    response = openai.ChatCompletion.create(
                model = "gpt-4-1106-preview",
                temperature = 0,
                messages=[
                        {"role": "system", "content": "You are helping me parse email threads by removing irrelevant information and structuring the threads chronologically."},
                        {"role": "user", "content": 
                        f"""
        Here's an email thread: {thread}. Please clean up the thread with the following guidelines:

        (a) Remove signature lines,
        (b) Eliminate all metadata such as From, To, Subject fields or similar although you can leave the Sent field that indicates the date of the message,
        (c) Delete any contact information, including physical addresses, office addresses, and email addresses,
        (d) Omit any Legal disclaimers, privacy policy statements, notices of confidentiality, or similar ancillaries,
        (e) Discard any promotional lines, company slogans, website links or marketing filler content.

        The goal is to isolate only the core dialog from the email threads. Please remove all metadata and extraneous elements, providing the discussion in the most intelligible format possible. Please do not include any additional commentary, such "Here's your parsed email thread:"
        """},
        ],
        n = 1
        )
    
    response_text = response.choices[0]["message"]["content"]

    return response_text

def clean_messages():
    df = read_csv('messages.csv')
    for index, row in df.iterrows():
        print(row.text)