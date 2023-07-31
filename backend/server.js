import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

import products from './data/products.js'
const app = express()
const port = process.env.PORT;


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

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})