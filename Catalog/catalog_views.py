from fastapi import APIRouter, Query
from typing import Annotated
from Catalog.crud import CatalogDAO

router = APIRouter(prefix="/catalog", tags=["Catalog"])

@router.get("/")
async def catalog(genres_include: Annotated[list[str] | None, Query()] = None, genres_exclude: Annotated[list[str] | None, Query()] = None):
    res = await CatalogDAO.see_catalog(genres_include, genres_exclude)
    return res
