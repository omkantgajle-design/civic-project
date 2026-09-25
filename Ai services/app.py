from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class ComplaintRequest(BaseModel):
    description: str


@app.get("/")
def home():
    return {
        "message": "CivicFlow AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# -----------------------------
# Feature 9: AI Classification
# -----------------------------
@app.post("/classify")
def classify_complaint(request: ComplaintRequest):

    description = request.description.lower()

    if any(word in description for word in [
        "pothole",
        "road",
        "road damage",
        "broken road",
        "footpath",
        "street"
    ]):
        category = "Road / Pothole"

    elif any(word in description for word in [
        "garbage",
        "waste",
        "dustbin",
        "trash",
        "rubbish"
    ]):
        category = "Garbage / Waste"

    elif any(word in description for word in [
        "water",
        "pipeline",
        "pipe",
        "water leakage",
        "water supply"
    ]):
        category = "Water Supply"

    elif any(word in description for word in [
        "street light",
        "lamp",
        "electric pole",
        "light not working"
    ]):
        category = "Street Light / Electrical"

    elif any(word in description for word in [
        "drain",
        "drainage",
        "sewage",
        "sewer"
    ]):
        category = "Drainage / Sewerage"

    else:
        category = "Other"

    return {
        "category": category
    }


# --------------------------------
# Feature 10: AI Priority Prediction
# --------------------------------
@app.post("/predict-priority")
def predict_priority(request: ComplaintRequest):

    description = request.description.lower()

    # CRITICAL
    if any(word in description for word in [
        "flood",
        "flooding",
        "fire",
        "gas leak",
        "electrocution",
        "danger to life",
        "life threatening",
        "collapsed",
        "collapse"
    ]):
        priority = "CRITICAL"

    # HIGH
    elif any(word in description for word in [
        "huge pothole",
        "major road damage",
        "accident",
        "dangerous",
        "unsafe",
        "severe",
        "blocked road",
        "water pipeline burst",
        "major leakage",
        "overflowing sewage"
    ]):
        priority = "HIGH"

    # MEDIUM
    elif any(word in description for word in [
        "garbage",
        "waste",
        "water leakage",
        "drain",
        "drainage",
        "street light",
        "broken light",
        "damaged road",
        "pothole"
    ]):
        priority = "MEDIUM"

    # LOW
    else:
        priority = "LOW"

    return {
        "priority": priority
    }
    # --------------------------------
# Feature 11: AI Department Routing
# --------------------------------
@app.post("/route-department")
def route_department(request: ComplaintRequest):

    description = request.description.lower()

    if any(word in description for word in [
        "pothole",
        "road",
        "road damage",
        "broken road",
        "footpath",
        "street"
    ]):
        department = "Road Department"

    elif any(word in description for word in [
        "garbage",
        "waste",
        "dustbin",
        "trash",
        "rubbish"
    ]):
        department = "Sanitation Department"

    elif any(word in description for word in [
        "water",
        "pipeline",
        "pipe",
        "water leakage",
        "water supply"
    ]):
        department = "Water Department"

    elif any(word in description for word in [
        "street light",
        "lamp",
        "electric pole",
        "light not working"
    ]):
        department = "Electrical Department"

    elif any(word in description for word in [
        "drain",
        "drainage",
        "sewage",
        "sewer"
    ]):
        department = "Drainage Department"

    else:
        department = "General Department"

    return {
        "department": department
    }