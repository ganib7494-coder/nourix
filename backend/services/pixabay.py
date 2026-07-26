import requests
import os
from dotenv import load_dotenv

load_dotenv()

def search_food_images(query: str, count: int = 4) -> list:
    api_key = os.getenv("PIXABAY_API_KEY")
    if not api_key:
        return []
    
    url = "https://pixabay.com/api/"
    params = {
        "key": api_key,
        "q": query,
        "image_type": "photo",
        "category": "food",
        "per_page": count,
        "safe_search": "true"
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        return [hit['webformatURL'] for hit in data.get('hits', [])]
    return []

def get_food_image(query: str) -> str:
    images = search_food_images(query, 1)
    return images[0] if images else ""
