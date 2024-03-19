import requests

# Configuration
GITHUB_TOKEN = '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'
USERNAME = 'derekshimoodys'
REPO_OWNER = 'moodyssharedservices'
REPO_NAME = 'ma-cor-hackathon-2024'
START_DATE = 'YYYY-MM-DD'
END_DATE = 'YYYY-MM-DD'

headers = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.v3+json',
}

def fetch_commits():
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/commits'
    params = {'author': USERNAME, 'since': START_DATE, 'until': END_DATE}
    response = requests.get(url, headers=headers, params=params)
    commits = response.json()
    return commits

def fetch_pull_requests():
    url = f'https://api.github.com/search/issues'
    query = f'repo:{REPO_OWNER}/{REPO_NAME} author:{USERNAME} type:pr created:{START_DATE}..{END_DATE}'
    params = {'q': query}
    response = requests.get(url, headers=headers, params=params)
    prs = response.json()['items']
    return prs

def fetch_issues():
    url = f'https://api.github.com/search/issues'
    query = f'repo:{REPO_OWNER}/{REPO_NAME} author:{USERNAME} type:issue created:{START_DATE}..{END_DATE}'
    params = {'q': query}
    response = requests.get(url, headers=headers, params=params)
    issues = response.json()['items']
    return issues

if __name__ == '__main__':
    commits = fetch_commits()
    pull_requests = fetch_pull_requests()
    issues = fetch_issues()

    print(f'Fetched {len(commits)} commits, {len(pull_requests)} pull requests, and {len(issues)} issues for user {USERNAME} in the repository {REPO_OWNER}/{REPO_NAME} from {START_DATE} to {END_DATE}.')
