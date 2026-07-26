import os
import json
import traceback
import requests
from flask import Flask, request, jsonify, render_template
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__,
            template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
            static_folder=os.path.join(os.path.dirname(__file__), 'static'))

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
PIXABAY_API_KEY = os.environ.get("PIXABAY_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable not set.")

groq_client = Groq(api_key=GROQ_API_KEY)

def get_image_url(query):
    if not PIXABAY_API_KEY:
        return "https://images.unsplash.com/photo-1540189549336-e619d45e0ace?q=80&w=2670&auto=format&fit=crop"
    
    search_url = f"https://pixabay.com/api/?key={PIXABAY_API_KEY}&q={query}&image_type=photo&per_page=3&safesearch=true"
    try:
        response = requests.get(search_url)
        response.raise_for_status()
        data = response.json()
        if data['hits']:
            return data['hits'][0]['webformatURL']
    except Exception as e:
        app.logger.error(f"Pixabay error: {e}")
    
    return "https://images.unsplash.com/photo-1540189549336-e619d45e0ace?q=80&w=2670&auto=format&fit=crop"

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/planner")
def planner_page():
    return render_template("planner.html")

@app.route("/health")
def health_page():
    return render_template("health.html")

@app.route("/about")
def about_page():
    return render_template("about.html")

@app.route("/api/health")
def health():
    return jsonify({'status': 'healthy', 'service': 'Nourix API'})

@app.route("/generate", methods=["POST"])
def generate_meal_plan():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data provided."}), 400

        breakfast = data.get("breakfast", "").strip()
        lunch = data.get("lunch", "").strip()
        dinner = data.get("dinner", "").strip()
        cuisine = data.get("cuisine", "").strip()
        diet_preference = data.get("dietPreference", "").strip()
        activity_level = data.get("activityLevel", "").strip()
        allergies = data.get("allergies", "").strip()
        num_servings = data.get("numServings", "").strip()
        cooking_time = data.get("cookingTime", "").strip()

        if not all([breakfast, lunch, dinner, cuisine, diet_preference, activity_level, num_servings, cooking_time]):
            return jsonify({"error": "All required fields must be filled."}), 400

        prompt = f"""
        You are Nourix, an expert AI Nutrition Planner. Generate a simple and beginner-friendly nutrition plan based on the full day meals provided.

        User inputs:
        - Breakfast: {breakfast}
        - Lunch: {lunch}
        - Dinner: {dinner}
        - Cuisine: {cuisine}
        - Dietary Preference: {diet_preference}
        - Activity Level / Goal: {activity_level}
        - Allergies: {allergies if allergies else 'None'}
        - Number of Servings: {num_servings}
        - Max Cooking Time: {cooking_time} minutes

        Return the response in the following JSON format only:
        {{
            "meal_plan": {{
                "breakfast": {{
                    "meal_name": "",
                    "calories": "",
                    "protein": "",
                    "carbs": "",
                    "fat": "",
                    "image_query": ""
                }},
                "lunch": {{
                    "meal_name": "",
                    "calories": "",
                    "protein": "",
                    "carbs": "",
                    "fat": "",
                    "image_query": ""
                }},
                "dinner": {{
                    "meal_name": "",
                    "calories": "",
                    "protein": "",
                    "carbs": "",
                    "fat": "",
                    "image_query": ""
                }}
            }},
            "ingredients_table": [
                {{
                    "ingredient": "",
                    "quantity": "",
                    "benefit": ""
                }}
            ],
            "cooking_steps": [
                ""
            ],
            "ai_nutrition_tips": [
                ""
            ],
            "health_benefits": [
                ""
            ],
            "daily_nutrition_summary": {{
                "calories": "",
                "protein": "",
                "carbohydrates": "",
                "fat": "",
                "fiber": ""
            }}
        }}
        Include 8-10 ingredients in the ingredients_table. Keep cooking steps simple (5 steps).
        Provide exactly 5 short tips for ai_nutrition_tips. List 5 simple benefits for health_benefits.
        Ensure all values are realistic and well-formatted. 'image_query' should only contain the dish name.
        """

        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.7,
            max_tokens=2000
        )

        response_content = chat_completion.choices[0].message.content
        meal_plan_data = json.loads(response_content)

        if "meal_plan" in meal_plan_data:
            for meal_type in ["breakfast", "lunch", "dinner"]:
                if meal_type in meal_plan_data["meal_plan"] and "image_query" in meal_plan_data["meal_plan"][meal_type]:
                    query = meal_plan_data["meal_plan"][meal_type]["image_query"]
                    meal_plan_data["meal_plan"][meal_type]["image_url"] = get_image_url(query)

        return jsonify(meal_plan_data)

    except json.JSONDecodeError:
        return jsonify({"error": "AI response was not valid JSON. Please try again."}), 500
    except Exception as e:
        app.logger.error(f"Error: {e}")
        app.logger.error(traceback.format_exc())
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
