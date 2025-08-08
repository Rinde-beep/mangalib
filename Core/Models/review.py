from Core.Models.Base import Base
from sqlalchemy import Column, Integer, String, JSON, Float, ForeignKey

class Reviews(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, nullable=False)
    manga_id = Column(Integer, ForeignKey("mangas.id"), nullable=False)
    user = Column(String, nullable=False)
    description = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    likes = Column(Integer, nullable=False)
    dislikes = Column(Integer, nullable=False)
    comments = Column(JSON, nullable=False)
