from services.groq_service import generate_nutrition_plan
from services.pixabay import search_food_images
from models.nutrition import NutritionPlannerService

def create_meal_plan(data: dict) -> dict:
    plan = NutritionPlannerService.create_meal_plan(data)
    
    # Enhance with real food images
    food_queries = [
        f"{data.get('diet_type', 'healthy')} breakfast",
        f"healthy lunch",
        f"dinner",
        f"healthy snacks"
    ]
    
    meal_images = {}
    for meal_type, query in zip(['breakfast', 'lunch', 'dinner', 'snacks'], food_queries):
        images = search_food_images(query, 1)
        meal_images[meal_type] = images[0] if images else None
    
    plan['images'] = meal_images
    return plan

def generate_recipe_recommendation(ingredients: list) -> dict:
    # Future: use AI to generate recipes
    return {'recipes': []}
