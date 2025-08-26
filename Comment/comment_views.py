from fastapi import APIRouter
from Comment.crud import CommentDAO
from Comment.schemas import Comment, CommentAdd
from fastapi.requests import Request
from Auth.depend import get_user
from fastapi import Depends

router = APIRouter(prefix="/api/comment", tags=["Comment"])


@router.post("/add/{manga_id}")
async def add_comment(manga_id: int, comment: CommentAdd, user=Depends(get_user)):
    await CommentDAO.insert_data(**comment.__dict__, user_id=user.id, manga_id=manga_id)

