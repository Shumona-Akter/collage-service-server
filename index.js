const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000
// require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://collage-book-service:8JK9pR8FmaBweczK@cluster0.tjvax7z.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const collageCollection = client.db("Collage-book-service").collection("Collage")

    app.get("/collage",async (req, res)=>{
      const cursor = collageCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/collage/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collageCollection.findOne(query);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
 
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
   
})