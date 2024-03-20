import requests
import json
import datetime
import re
import time


diff_filepath = "Team04/diff.txt"


def openai_call(diff_filepath):

    with open(diff_filepath, 'r') as file:
        git_diff = file.read()

    url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
    }

    data = {
        "messages": [
                {
                    "role": "system",
                    "content": "The included string is a git diff script. From this file you should create a commit message to be added to the newest version of our repo. The commit message should not exceed a single sentence. The structure should follow application development best practices."
                },
                {
                    "role": "user",
                    "content": git_diff
                }
            ],
        "model": "gpt-4",
        "max_tokens": 1800,
        "temperature": 0.1,
        "top_p": 0.1
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(f"Response: \n\n\n", response)
    API_Data = response.json()
    message = API_Data['choices'][0]['message']['content']
    commit_message = message.split('.', 1)
    
    return commit_message

commit_message = openai_call(diff_filepath)

print(commit_message)