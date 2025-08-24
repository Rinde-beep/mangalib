import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from Core.Models.Base import Base
from sqlalchemy import Column, String, JSON, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
import Core.Models.manga as m
import Core.Models.review as r
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from Core.Models.comment import Comments
    from Core.Models.lists import Lists
    from Core.Models.review import Reviews
    from Core.Models.user import Users
    from Core.Models.manga import Mangas

class Comments(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    manga_id: Mapped[int] = mapped_column(ForeignKey("mangas.id"))
    review_id: Mapped[int] = mapped_column(ForeignKey("reviews.id"))
    user: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    likes: Mapped[int] = mapped_column(nullable=False)
    dislikes: Mapped[int] = mapped_column(nullable=False)

