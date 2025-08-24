from Core.Models.Base import async_session_maker
from sqlalchemy import select, update
from Core.Models.manga import Mangas
import aiohttp
import asyncio
names_all = []



async def parsing_2():
    async with async_session_maker() as ses:
            query = select(Mangas.name)
            res = ses.execute(query).mappings().all()
            for i in res:
                a = i.split("-")
                names_all.append(a[0])
            print(names_all)
        
            # async with aiohttp.ClientSession() as ses:
            #     for i in res:
            #         url = ""
asyncio.run(parsing_2())
