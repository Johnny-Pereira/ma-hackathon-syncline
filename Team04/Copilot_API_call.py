import json
import requests

def openai_call(diff_file):

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
                    "content": diff_file
                }
            ],
        "model": "gpt-4",
        "max_tokens": 800,
        "temperature": 0.1,
        "top_p": 0.1
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))
    API_Data = response.json()
    message = API_Data['choices'][0]['message']['content']
    commit_message = message.split('.', 1)
    
    return commit_message