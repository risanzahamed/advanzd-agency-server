const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 8000
require("dotenv").config()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Social Media server is running')
})




const uri = `mongodb+srv://advanzd-agency:8BSGMCzIVU4D3d7e@cluster0.h3zxwhp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    try {

        const jobsCategory = client.db('advanzd-agency').collection('jobsCategory')
        const jobDetailsByCategory = client.db('advanzd-agency').collection('jobsdetails')

        app.get('/jobs-category', async (req, res) => {
            const query = {}
            const cursor = jobsCategory.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/jobs-category/:id', async (req, res) => {
            const id = req.params.id
            const query = { category: id }
            const jobs = await jobsCategory.findOne(query)
            res.send(jobs)
        })

       

        app.get('/job-details', async (req, res) => {
            const query = {}
            const cursor = jobDetailsByCategory.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/job-details/:id', async (req, res) => {
            const id = req.params.id
            const query = { category_id: id }
            const jobs = await jobDetailsByCategory.find(query).toArray()
            res.send(jobs)
        })

        app.get('/post/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await jobDetailsByCategory.findOne(query)
            res.send(result)
        })

    }

    finally {

    }

}

run()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})