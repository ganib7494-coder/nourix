from pydantic import BaseModel
from typing import List, Dict, Optional

class User(BaseModel):
    id: Optional[str] = None
    email: str
    name: str
    dietary_preferences: List[str] = []
    allergies: List[str] = []

class UserProfile(BaseModel):
    user_id: str
    age: int
    weight: float
    height: float
    gender: str
    activity_level: str
    goal: str
