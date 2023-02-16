const express=require('express')
const redis=require('redis')
const axios = require('axios')
const util = require('util')
const redisURL = "redis://127.0.0.1:6380"
const client = redis.createClient(redisURL)
client.set = util.promisify(client.set)
client.get = util.promisify(client.get)
const app = express();

app.use(express.json())

app.post('/',async (req,res)=>{
    const {key,value} = req.body;
    const response = await client.set(key,value);
    res.json(response);
})

app.get('/', async(req,res)=>{
    const{key}=req.body;
    const value=await client.get(key);
    res.json(value);
})

app.delete('/',async(req,res)=>{
    const {key,value} = req.body;
    const response = await client.setex(key,10,value);
    res.json(response);
})

app.listen(8080, ()=>{
    console.log("connected to 8080")
})