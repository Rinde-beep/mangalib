from Core.Models.Base import Base
from sqlalchemy import Column, Integer, String, LargeBinary, Float


class Mangas(Base):
    __tablename__ = "mangas"

    id = Column(Integer, primary_key=True)
    preview_picture_id: int = Column(String, default=None)
    name = Column(String, nullable=False)
    description = Column(String)
    tags = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    chapter_size = Column(Integer, nullable=False)
    volume_size = Column(Integer, nullable=False)
    status = Column(String, nullable=False)
    total_list = Column(Integer, default=0)
    reading = Column(Integer, default=0)
    planned = Column(Integer, default=0)
    completed = Column(Integer, default=0)
    favorite = Column(Integer, default=0)
    on_hold = Column(Integer, default=0)
    dropped = Column(Integer, default=0)
    total_rating = Column(Integer, default=0)
    rating_10 = Column(Integer, default=0)
    rating_9 = Column(Integer, default=0)
    rating_8 = Column(Integer, default=0)
    rating_7 = Column(Integer, default=0)
    rating_6 = Column(Integer, default=0)
    rating_5 = Column(Integer, default=0)
    rating_4 = Column(Integer, default=0)
    rating_3 = Column(Integer, default=0)
    rating_2 = Column(Integer, default=0)
    rating_1 = Column(Integer, default=0)

