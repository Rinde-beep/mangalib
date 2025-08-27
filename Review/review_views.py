from fastapi import APIRouter, Depends
from Auth.depend import get_user
from Review.schemas import Review, ReviewAdd
from Review.crud import ReviewDAO

router = APIRouter(prefix="/api/review", tags=["Review"])


@router.post("/add/{manga_id}")
async def add_review(manga_id: int, review: ReviewAdd, user=Depends(get_user)):
    await ReviewDAO.insert_data(**review.__dict__, user_id=user.id, manga_id=manga_id)
    
