from Core.Models.Base import Base
from sqlalchemy import Column, BLOB, Integer, JSON, ForeignKey

class Pages(Base):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True, nullable=False)
    manga_id = Column(Integer, ForeignKey("mangas.id"), nullable=False)
    page_id = Column(Integer, nullable=False)
    comments = Column(JSON)
    volume = Column(Integer, nullable=False)
    chapter = Column(Integer, nullable=False)
    page = Column(Integer, nullable=False)



