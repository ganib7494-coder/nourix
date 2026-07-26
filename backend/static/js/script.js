document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="/"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash && this.pathname === window.location.pathname) {
                e.preventDefault();
                document.querySelector(this.hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const mealPlanForm = document.getElementById('mealPlanForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const mealPlanResult = document.getElementById('mealPlanResult');

    const mealPlanBreakfastName = document.getElementById('mealPlanBreakfastName');
    const mealPlanBreakfastCalories = document.getElementById('mealPlanBreakfastCalories');
    const mealPlanBreakfastProtein = document.getElementById('mealPlanBreakfastProtein');
    const mealPlanBreakfastCarbs = document.getElementById('mealPlanBreakfastCarbs');
    const mealPlanBreakfastFat = document.getElementById('mealPlanBreakfastFat');
    const breakfastImage = document.getElementById('breakfastImage');
    const breakfastCardMealName = document.getElementById('breakfastCardMealName');
    const breakfastCardCalories = document.getElementById('breakfastCardCalories');

    const mealPlanLunchName = document.getElementById('mealPlanLunchName');
    const mealPlanLunchCalories = document.getElementById('mealPlanLunchCalories');
    const mealPlanLunchProtein = document.getElementById('mealPlanLunchProtein');
    const mealPlanLunchCarbs = document.getElementById('mealPlanLunchCarbs');
    const mealPlanLunchFat = document.getElementById('mealPlanLunchFat');
    const lunchImage = document.getElementById('lunchImage');
    const lunchCardMealName = document.getElementById('lunchCardMealName');
    const lunchCardCalories = document.getElementById('lunchCardCalories');

    const mealPlanDinnerName = document.getElementById('mealPlanDinnerName');
    const mealPlanDinnerCalories = document.getElementById('mealPlanDinnerCalories');
    const mealPlanDinnerProtein = document.getElementById('mealPlanDinnerProtein');
    const mealPlanDinnerCarbs = document.getElementById('mealPlanDinnerCarbs');
    const mealPlanDinnerFat = document.getElementById('mealPlanDinnerFat');
    const dinnerImage = document.getElementById('dinnerImage');
    const dinnerCardMealName = document.getElementById('dinnerCardMealName');
    const dinnerCardCalories = document.getElementById('dinnerCardCalories');

    const ingredientsTableBody = document.getElementById('ingredientsTableBody');
    const cookingStepsList = document.getElementById('cookingStepsList');
    const aiNutritionTipsList = document.getElementById('aiNutritionTipsList');
    const healthBenefitsList = document.getElementById('healthBenefitsList');
    const dailySummaryCalories = document.getElementById('dailySummaryCalories');
    const dailySummaryProtein = document.getElementById('dailySummaryProtein');
    const dailySummaryCarbohydrates = document.getElementById('dailySummaryCarbohydrates');
    const dailySummaryFat = document.getElementById('dailySummaryFat');
    const dailySummaryFiber = document.getElementById('dailySummaryFiber');

    function getMealImage(mealName) {
        mealName = mealName.toLowerCase();
        if (mealName.includes("egg")) return "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800";
        if (mealName.includes("salad")) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";
        if (mealName.includes("pizza")) return "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800";
        if (mealName.includes("taco")) return "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800";
        if (mealName.includes("burger")) return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800";
        if (mealName.includes("rice")) return "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800";
        if (mealName.includes("chicken")) return "https://images.unsplash.com/photo-1604908176997-4315c3f2f8b0?w=800";
        return "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800";
    }

    if (mealPlanForm) {
        mealPlanForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            loadingSpinner.style.display = 'block';
            mealPlanResult.style.display = 'none';
            ingredientsTableBody.innerHTML = '';
            cookingStepsList.innerHTML = '';
            aiNutritionTipsList.innerHTML = '';
            healthBenefitsList.innerHTML = '';
            breakfastImage.src = '';
            breakfastCardMealName.textContent = '';
            breakfastCardCalories.textContent = '';
            lunchImage.src = '';
            lunchCardMealName.textContent = '';
            lunchCardCalories.textContent = '';
            dinnerImage.src = '';
            dinnerCardMealName.textContent = '';
            dinnerCardCalories.textContent = '';

            const formData = new FormData(mealPlanForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to generate meal plan');
                }

                const result = await response.json();
                displayMealPlan(result);
            } catch (error) {
                console.error('Error:', error);
                alert('Error generating meal plan: ' + error.message);
            } finally {
                loadingSpinner.style.display = 'none';
            }
        });
    }

    function displayMealPlan(plan) {
        if (!plan) return;

        if (plan.meal_plan) {
            if (plan.meal_plan.breakfast) {
                const mealName = plan.meal_plan.breakfast.meal_name || 'N/A';
                mealPlanBreakfastName.textContent = mealName;
                mealPlanBreakfastCalories.textContent = plan.meal_plan.breakfast.calories || 'N/A';
                mealPlanBreakfastProtein.textContent = plan.meal_plan.breakfast.protein || 'N/A';
                mealPlanBreakfastCarbs.textContent = plan.meal_plan.breakfast.carbs || 'N/A';
                mealPlanBreakfastFat.textContent = plan.meal_plan.breakfast.fat || 'N/A';
                breakfastImage.src = getMealImage(mealName);
                breakfastCardMealName.textContent = mealName;
                breakfastCardCalories.textContent = `Calories: ${plan.meal_plan.breakfast.calories || 'N/A'}`;
            }
            if (plan.meal_plan.lunch) {
                const mealName = plan.meal_plan.lunch.meal_name || 'N/A';
                mealPlanLunchName.textContent = mealName;
                mealPlanLunchCalories.textContent = plan.meal_plan.lunch.calories || 'N/A';
                mealPlanLunchProtein.textContent = plan.meal_plan.lunch.protein || 'N/A';
                mealPlanLunchCarbs.textContent = plan.meal_plan.lunch.carbs || 'N/A';
                mealPlanLunchFat.textContent = plan.meal_plan.lunch.fat || 'N/A';
                lunchImage.src = getMealImage(mealName);
                lunchCardMealName.textContent = mealName;
                lunchCardCalories.textContent = `Calories: ${plan.meal_plan.lunch.calories || 'N/A'}`;
            }
            if (plan.meal_plan.dinner) {
                const mealName = plan.meal_plan.dinner.meal_name || 'N/A';
                mealPlanDinnerName.textContent = mealName;
                mealPlanDinnerCalories.textContent = plan.meal_plan.dinner.calories || 'N/A';
                mealPlanDinnerProtein.textContent = plan.meal_plan.dinner.protein || 'N/A';
                mealPlanDinnerCarbs.textContent = plan.meal_plan.dinner.carbs || 'N/A';
                mealPlanDinnerFat.textContent = plan.meal_plan.dinner.fat || 'N/A';
                dinnerImage.src = getMealImage(mealName);
                dinnerCardMealName.textContent = mealName;
                dinnerCardCalories.textContent = `Calories: ${plan.meal_plan.dinner.calories || 'N/A'}`;
            }
        }

        if (plan.ingredients_table && plan.ingredients_table.length > 0) {
            ingredientsTableBody.innerHTML = '';
            plan.ingredients_table.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${item.ingredient || 'N/A'}</td><td>${item.quantity || 'N/A'}</td><td>${item.benefit || 'N/A'}</td>`;
                ingredientsTableBody.appendChild(tr);
            });
        } else {
            ingredientsTableBody.innerHTML = '<tr><td colspan="3">No ingredients listed.</td></tr>';
        }

        if (plan.cooking_steps && plan.cooking_steps.length > 0) {
            cookingStepsList.innerHTML = '';
            plan.cooking_steps.forEach(step => {
                const li = document.createElement('li');
                li.className = 'list-group-item glass-item';
                li.textContent = step;
                cookingStepsList.appendChild(li);
            });
        } else {
            cookingStepsList.innerHTML = '<li class="list-group-item glass-item">No cooking steps provided.</li>';
        }

        if (plan.ai_nutrition_tips && plan.ai_nutrition_tips.length > 0) {
            aiNutritionTipsList.innerHTML = '';
            plan.ai_nutrition_tips.forEach(tip => {
                const li = document.createElement('li');
                li.className = 'list-group-item glass-item';
                li.textContent = tip;
                aiNutritionTipsList.appendChild(li);
            });
        } else {
            aiNutritionTipsList.innerHTML = '<li class="list-group-item glass-item">No AI nutrition tips provided.</li>';
        }

        if (plan.health_benefits && plan.health_benefits.length > 0) {
            healthBenefitsList.innerHTML = '';
            plan.health_benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.className = 'list-group-item glass-item';
                li.textContent = benefit;
                healthBenefitsList.appendChild(li);
            });
        } else {
            healthBenefitsList.innerHTML = '<li class="list-group-item glass-item">No health benefits listed.</li>';
        }

        if (plan.daily_nutrition_summary) {
            dailySummaryCalories.textContent = plan.daily_nutrition_summary.calories || 'N/A';
            dailySummaryProtein.textContent = plan.daily_nutrition_summary.protein || 'N/A';
            dailySummaryCarbohydrates.textContent = plan.daily_nutrition_summary.carbohydrates || 'N/A';
            dailySummaryFat.textContent = plan.daily_nutrition_summary.fat || 'N/A';
            dailySummaryFiber.textContent = plan.daily_nutrition_summary.fiber || 'N/A';
        }

        mealPlanResult.style.display = 'block';
        mealPlanResult.scrollIntoView({ behavior: 'smooth' });
    }

    const animatedCards = document.querySelectorAll('.animate__animated');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
                entry.target.style.visibility = 'visible';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedCards.forEach(card => {
        if (!card.classList.contains('animate__animated')) {
            card.style.visibility = 'hidden';
            observer.observe(card);
        }
    });
});