from fastapi import APIRouter
from User.schemas import User
import User.crud as crud
router = APIRouter(prefix="/api/user", tags=["User"])


@router.get("/")
def all_users():
    pass

@router.get("/{id}")
def user_profile(id: int):
    pass

@router.get("/{id}/bookmarks")
def bookmarks(id: int, status: int):
    pass

@router.post("/add")
def user_add(user: User):
    crud.create_user(user)
    pass
