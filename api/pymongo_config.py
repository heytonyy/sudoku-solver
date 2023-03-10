from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection

import os
import certifi
from dotenv import load_dotenv
load_dotenv()

class PyMongoConnection:
    def __init__(self, db: str, collection: str) -> None:
        self.client: MongoClient = MongoClient(os.getenv('MONGO_CONNECTION'), tlsCAFile=certifi.where())
        self.db: Database = self.client[db]
        self.collection: Collection = self.db[collection]
    
    def insert_one(self, data: dict) -> None:
        self.collection.insert_one(data)

    def find_one(self, query) -> dict:
        return self.collection.find_one(query)

    def find_all(self, query) -> list:
        return self.collection.find(query)

    def update_one(self, query, data) -> None:
        self.collection.update_one(query, data)

    def delete_one(self, query) -> None:
        self.collection.delete_one(query)

    def delete_all(self, query) -> None:
        self.collection.delete_many(query)

    def drop(self) -> None:
        self.collection.drop()

    def close(self) -> None:
        self.client.close()