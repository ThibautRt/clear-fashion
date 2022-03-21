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

app.get('/products/:id', async (request, response) => {
    const data = await db.find_by_id(request.params.id)
    console.log(data)
    response.send(data);
})

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
