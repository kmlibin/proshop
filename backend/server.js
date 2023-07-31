import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import products from './data/products.js'

//connect to MongoDB
connectDB()
//create server
const app = express()


app.get('/', (req, res) => {
    res.send('API running')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((i) => i._id === req.params.id);
    res.json(product)
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})