from fastapi import APIRouter, Query
from typing import Annotated
from Catalog.crud import CatalogDAO

router = APIRouter(prefix="/api/catalog", tags=["Catalog"])

@router.get("/")
async def catalog(page: int = 0, 
                  genres_include:
                  Annotated[list[str] | None, Query()] = None, 
                  genres_exclude: Annotated[list[str] | None, Query()] = None):
    res = await CatalogDAO.see_catalog(genres_include, genres_exclude, page)
    return res
