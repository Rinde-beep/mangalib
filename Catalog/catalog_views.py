from fastapi import APIRouter, Query
from typing import Annotated
from Catalog.crud import CatalogDAO
from fastapi_cache.decorator import cache
import asyncio

router = APIRouter(prefix="/api/catalog", tags=["Catalog"])

@router.get("/")
@cache(expire=30)
async def catalog(page: int = 0, 
            genres_include:
            Annotated[list[str] | str, Query()] = None, 
            genres_exclude: Annotated[list[str] | str, Query()] = None,
            filter: str | None = None,
            sort: str | None = None
            ):
    res = await CatalogDAO.see_catalog(page, filter, sort, genres_include, genres_exclude)
    return res
