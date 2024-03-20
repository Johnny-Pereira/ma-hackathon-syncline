import os
import openai
import json
import pandas as pd

with open("config.json") as file:
    config = json.load(file)

openai.api_key = config.get("key")
os.environ["OPENAI_API_KEY"] = config["key"]

def prompt_gpt(thread):
    response = openai.ChatCompletion.create(
                model = "gpt-4-1106-preview",
                temperature = 0,
                messages=[
                        {"role": "system", "content": "You are helping me parse slack help channel messages by removing irrelevant information."},
                        {"role": "user", "content": 
                        f"""
        Here"s a message thread: {thread}. Please clean up the message with the following guidelines:
        
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

    return response_text

def clean_messages(cleaned_messages_file_path):
    df = pd.read_csv(cleaned_messages_file_path)
    for index, row in df.iloc[800:].iterrows():
        response_text = prompt_gpt(row.text)
        df.at[index, "Cleaned Text"] = response_text
        df.to_csv(cleaned_messages_file_path, index=False)
        print(response_text)

def main():
    clean_messages("cleaned_messages.csv")

if __name__ == "__main__":
    main()
    