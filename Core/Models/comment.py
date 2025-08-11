from Core.Models.Base import Base
from sqlalchemy import Column, Integer, String, JSON, Float, ForeignKey

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, nullable=False)
    manga_id = Column(Integer, ForeignKey("mangas.id"))
    review_id = Column(Integer, ForeignKey("reviews.id"))
    user = Column(String, nullable=False)
    description = Column(String, nullable=False)
    likes = Column(Integer, nullable=False)
    dislikes = Column(Integer, nullable=False)
