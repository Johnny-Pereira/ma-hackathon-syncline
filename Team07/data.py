import os
import openai
import json
import pandas as pd

def read_csv(file_path):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(file_path, encoding='utf-8')

     # Select the second column (assuming it's named 'column2')
    df_adjusted = df.iloc[:, 1]

    # Convert the Series back into a DataFrame
    df_single_column = df_adjusted.to_frame()
    return df_single_column

with open('config.json') as file:
    config = json.load(file)

openai.api_key = config.get('key')
os.environ['OPENAI_API_KEY'] = config["key"]

thread = '''"jwt audience invalid. expected: https://theproductionDomain.com"'''

def prompt(thread):
    response = openai.ChatCompletion.create(
                model = "gpt-4-1106-preview",
                temperature = 0,
                messages=[
                        {"role": "system", "content": "You are helping me parse slack help channel messages by removing irrelevant information."},
                        {"role": "user", "content": 
                        f"""
        Here's a message thread: {thread}. Please clean up the message with the following guidelines:

        (a) Remove unicode characters, emojis, and non-English text,
        (b) Eliminate all usernames, including any that start with an @ symbol,
        (c) Delete any contact information, including physical addresses, office addresses, and email addresses,
        (d) Remove characters that are not part of the core message, such as bullet points, numbers, and special characters.
        (e) Discard any additional lines that are not part of the core message, such as  Please clean up the message with the following guidelines, I want to give a message and test this.
        (f) Keep the URL information,code but remove any additional text that is not part of the core message.


        The goal is to isolate only the core text from the message threads. Please remove all metadata and extraneous elements, providing the discussion in the most intelligible format possible."
        """},
        ],
        n = 1
        )
    
    response_text = response.choices[0]["message"]["content"]

    print (response_text)

    return response_text
prompt(thread)

def clean_messages():
    df = read_csv('messages.csv')
    for index, row in df.iterrows():
        print(row.text)