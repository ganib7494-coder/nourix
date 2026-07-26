def format_bmi(bmi):
    categories = {
        (< 18.5): 'Underweight',
        (18.5, 24.9): 'Normal weight',
        (25, 29.9): 'Overweight',
        (30, float('inf')): 'Obese'
    }
    for range_tuple, category in categories.items():
        if range_tuple[0] <= bmi < range_tuple[1]:
            return category
    return 'Unknown'
