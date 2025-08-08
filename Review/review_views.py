from fastapi import APIRouter
from Review.schemas import Review
import Review.crud as crud

router = APIRouter(prefix="/review", tags=["Review"])

@router.get("/")
def review():
    pass

@router.post("/add")
def add_review(review:Review):
    crud.create_review(review)
    pass
