import requests

def fetch_repo_commits(org_name, repo_name, token):
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    url = f'https://api.github.com/repos/{org_name}/{repo_name}/commits'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        commits = response.json()
        return commits
    elif response.status_code == 404:
        print(f"Repository not found: {org_name}/{repo_name}")
        return None
    else:
        print(f"Failed to fetch data: {response.status_code}")
        return None

# Replace these variables with the organization name, repository name, and personal access token
org_name = 'moodyssharedservices'
repo_name = 'ma-cor-hackathon-2024'
token = ''
commits = fetch_repo_commits(org_name, repo_name, token)
if commits:
    print("Commits in the repository:")
    for commit in commits:
        print(commit['commit']['message'])