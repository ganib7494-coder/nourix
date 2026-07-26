from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class MealPlan(BaseModel):
    id: Optional[str] = None
    user_id: Optional[str] = None
    diet_type: str
    meals: List[Dict[str, any]]
    total_calories: int
    created_at: str

class ChatMessage(BaseModel):
    id: Optional[str] = None
    role: str
    content: str
    timestamp: str = datetime.now().isoformat()
