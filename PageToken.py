import requests

user_access_token = 'EAA1MDxDpXvkBQDSL0gU7lJUMIOfQ28FvhRlEvzYKlxGvBkq33qb1QE7G1wZAb4MRrlZBl4JZAODJrJAIlLmd9IKZAVpOueZAiZAlNH8YRLIlC0gYBWihcMKySuektUk7TYrbyrBEhQ9llqeZAT6GYZAQjZBN1syslV9NDMhntQ9ZCkz3hmVdgdrDb6hz7qkdWc'

user_id = '122095552365137302' 

url = f"https://graph.facebook.com/{user_id}/accounts?access_token={user_access_token}"

response = requests.get(url)
data = response.json()

if 'data' in data:
    print("\n--- YOUR PAGES AND TOKENS ---\n")
    for page in data['data']:
        print(f"Page Name:   {page['name']}")
        print(f"Page ID:     {page['id']}")
        print(f"PAGE TOKEN:  {page['access_token']}")
        print("-" * 60)
else:
    print("Error:", data)