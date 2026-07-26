import os
import requests
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_nutrition_plan(user_input: str) -> str:
    prompt = f"""
    You are a professional nutritionist AI. Create a personalized meal plan based on:
    {user_input}
    
    Provide:
    1. Daily calorie target
    2. Breakfast suggestion
    3. Lunch suggestion
    4. Dinner suggestion
    5. 2 snack ideas
    6. Nutritional tips
    
    Be concise and practical.
    """
    
    completion = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.7,
        max_tokens=1024,
    )
    
    return completion.choices[0].message.content

def get_ai_response(message: str, context: str = "") -> str:
    prompt = f"""
    You are a helpful AI nutrition assistant. Answer the user's question concisely.
    Context: {context}
    User: {message}
    """
    
    completion = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.7,
        max_tokens=512,
    )
    
    return completion.choices[0].message.content
