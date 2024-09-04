
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pydantic import BaseModel
from pysondb import db
from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost:8080"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Candle(BaseModel):
    name: str
    description: str
    category: str
    image_url: str
    ingredients: str

class Order(BaseModel):
    orderId: int
    salesAssociate: str
    scentProfiles: list[str]
    customerFirstName: str
    customerLastName: str
    quantity: int
    status: int

# Get all Candles
@app.get("/candles")
async def getAllCandles():
    candles_database = db.getDb("candles_database")
    candles = candles_database.getAll()
    print(json.dumps(candles, indent=2))
    return candles

# Get Candle by ID
@app.get("/candles/{id}")
async def getCandle(id):
    candles_database = db.getDb("candles_database")
    candle = candles_database.getById(int(id))
    name = candle["name"]
    print(name)
    return name

# Add new Candle
@app.post("/candles")
async def addCandleToDB(payload: Candle):
    candles_database = db.getDb("candles_database")
    json = payload.model_dump()
    now = str(datetime.now())
    json['created_at'] = now
    json['updated_at'] = now
    candles_database.add(json)
    return payload

@app.put("/candles/{id}")
async def updateCandle(id: str, payload: Candle):
    candles_database = db.getDb("candles_database")
    json = payload.model_dump()
    candle = candles_database.getById(int(id))
    json['created_at'] = candle['created_at']
    json['updated_at'] = str(datetime.now())
    candles_database.updateById(id, json)
    return json

# Clear Candles Database
@app.delete("/candles")
async def deleteAllCandles():
    candles_database = db.getDb("candles_database")
    candles_database.deleteAll()
    return "DB Items Deleted"

# Delete Candle by id
@app.delete("/candles/{id}")
async def deleteCandle(id):
    candles_database = db.getDb("candles_database")
    candle = candles_database.getById(int(id))
    name = candle["name"]
    candles_database.deleteById(int(id))
    return "Candle " + name + " has been removed"

@app.post("/orders")
async def addOrder(payload: Order):
    orders_database = db.getDb("orders_database")
    json = payload.model_dump()
    orders_database.add(json)
    return payload

@app.put("/orders/{id}")
async def updateOrder(id: str, payload: Order):
    orders_database = db.getDb("orders_database")
    json = payload.model_dump()
    orders_database.updateById(id, json)
    return orders_database.getById(id)

# Get all Orders
@app.get("/orders")
async def getAllOrders():
    orders_database = db.getDb("orders_database")
    orders = orders_database.getAll()
    print(json.dumps(orders, indent=2))
    return orders

# Get Order by ID
@app.get("/orders/{id}")
async def getOrder(id):
    orders_database = db.getDb("orders_database")
    order = orders_database.getById(int(id))
    return order

# Clear Orders Database
@app.delete("/orders")
async def deleteAllCandles():
    orders_database = db.getDb("orders_database")
    orders_database.deleteAll()
    return "DB Items Deleted"


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8090)
    
