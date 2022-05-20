const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json())

//user = db_user2
//pass = oqBJ7drJE3tXh14E

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ajin2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
       const fridgeCollection = client.db('fridge-store').collection('fridge');

       app.get('/fridge', async(req, res) =>{
        const query= {};
        const cursor = fridgeCollection.find(query);
        const fridges = await cursor.toArray();
        res.send(fridges)

        app.get('/fridge/:id', async(req, res)=>{
            const id= req.params.id;
            const query ={_id: ObjectId(id)};
            const fridge = await fridgeCollection.findOne(query)
            res.send(fridge)
        })

        app.post('/fridge', async(req, res)=>{
            const newService= req.body;
            const result = await fridgeCollection.insertOne(newService);
            res.send(result);
        })

        //DELETE
        app.delete('/fridge/:id', async(req,res)=>{
            const id= req.params.id;
            const query ={_id: ObjectId(id)};
            const result = await fridgeCollection.deleteOne(query);
            res.send(result);
        })

       });


    }finally{

    }
}
run().catch(console.dir);




app.get('/',(req, res)=>{
    res.send('Hello server')
})

app.listen(port,()=>{
    console.log('listening port',port)
})