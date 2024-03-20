import requests
import json
import datetime
import re
import time

#load git_diff

diff_filepath = "C:\\Users\\arthurj\\OneDrive - moodys.com\\Desktop\\diff_example.txt"

with open(diff_filepath, 'r') as file:
    git_diff = file.read()


def openai_call(diff_file):

    url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'accept': 'application/json',
        'x-api-client': 'team_2', 
        'x-api-key': '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',   
        'Content-Type': 'application/json'
    }

    data = {
        "messages": [
                {
                    "role": "system",
                    "content": "The included string is a git diff script. From this file you should create e both a commit message to be added to the newest version of our repo and a more in depth summary which will provide developers with further detail about version changes. The commit message should not exceed a single sentence. The detailed summary should be bullet point structured. The structure of both should follow application development best practices."
                },
                {
                    "role": "user",
                    "content": git_diff
                }
            ],
        "model": "gpt-4",
        "max_tokens": 800,
        "temperature": 0.1,
        "top_p": 0.1
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(response.status_code)
    API_Data = response.json()
    print(API_Data)

    return message

commit_output = openai_call(git_diff)
print(commit_output)