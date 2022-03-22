const cors = require('cors');
const { response } = require('express');
const express = require('express');
const helmet = require('helmet');
const db = require('./connection');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/all', async (request, response) => {
    const PAGE = request.query.page
    const SIZE = request.query.size

    let query = {};
    let options = {
        "limit": 12,
        "skip": 0
    }
    if (SIZE != undefined) {
        options.limit = parseInt(SIZE)
    }
    if ((PAGE != undefined) && (PAGE != 0)){
        options.skip = (parseInt(PAGE) - 1) * options.limit;
    }
    const results = await db.find_limit(query, options);
    response.json({ query, options, "total": results.length, results });
})

app.get('/products/search', async (request, response) => {
    console.log("GET /products/search");
    console.log(request.query);

    const LIMIT = request.query.limit;
    const BRAND = request.query.brand;
    const PRICE = request.query.price;

    let query = {};
    let options = { "limit": 12 };
    if (LIMIT != undefined) {
        options.limit = parseInt(LIMIT)
    }
    if (BRAND != undefined) {
        query.brand = BRAND;
    }
    if (PRICE != undefined) {
        query.price = { "$lte": parseFloat(PRICE) }
    }
    const results = await db.find_limit(query, options);
    response.json({ query, options, "total": results.length, results });
})

app.get('/products/:id', async (request, response) => {
    console.log("GET /products/:id")
    const data = await db.find_by_id(request.params.id)
    console.log(data)
    response.send(data);
})

app.listen(PORT)

console.log(`📡 Running on port ${PORT}`);
