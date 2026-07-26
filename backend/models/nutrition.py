from models.meal_plan import MealPlan

class NutritionPlannerService:
    @staticmethod
    def calculate_bmi(weight: float, height: float) -> float:
        height_m = height / 100
        bmi = weight / (height_m ** 2)
        return round(bmi, 2)

    @staticmethod
    def calculate_daily_calories(profile: dict) -> int:
        # Basic BMR calculation
        if profile['gender'] == 'male':
            bmr = 10 * profile['weight'] + 6.25 * profile['height'] - 5 * profile['age'] + 5
        else:
            bmr = 10 * profile['weight'] + 6.25 * profile['height'] - 5 * profile['age'] - 161
        
        activity_multipliers = {
            'sedentary': 1.2,
            'lightly_active': 1.375,
            'moderately_active': 1.55,
            'very_active': 1.725,
            'extra_active': 1.9
        }
        
        multiplier = activity_multipliers.get(profile['activity_level'], 1.2)
        tdee = bmr * multiplier
        
        if profile['goal'] == 'lose':
            return int(tdee - 500)
        elif profile['goal'] == 'gain':
            return int(tdee + 500)
        else:
            return int(tdee)

    @staticmethod
    def generate_meal_plan(diet_type: str, calories: int) -> dict:
        # Sample meal structure
        return {
            'breakfast': f"Breakfast plan for {diet_type} diet (~{int(calories*0.25)} calories)",
            'lunch': f"Lunch plan for {diet_type} diet (~{int(calories*0.35)} calories)",
            'dinner': f"Dinner plan for {diet_type} diet (~{int(calories*0.35)} calories)",
            'snacks': f"Snack suggestions for {diet_type} diet (~{int(calories*0.05)} calories)"
        }

    @staticmethod
    def create_meal_plan(data: dict) -> dict:
        bmi = NutritionPlannerService.calculate_bmi(
            data.get('weight', 70),
            data.get('height', 170)
        )
        daily_calories = NutritionPlannerService.calculate_daily_calories({
            'age': data.get('age', 30),
            'weight': data.get('weight', 70),
            'height': data.get('height', 170),
            'gender': data.get('gender', 'male'),
            'activity_level': data.get('activity_level', 'moderately_active'),
            'goal': data.get('goal', 'maintain')
        })
        meals = NutritionPlannerService.generate_meal_plan(
            data.get('diet_type', 'balanced'),
            daily_calories
        )
        
        return {
            'bmi': bmi,
            'daily_calories': daily_calories,
            'meals': meals,
            'recommendations': [
                "Stay hydrated throughout the day",
                "Include a variety of food groups",
                "Monitor portion sizes"
            ]
        }
