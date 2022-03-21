const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://thibautrt:Choucroute@clear-fashion.1be5z.mongodb.net/clear-fashion?retryWrites=true&w=majority";
const MONGODB_DB_NAME = 'clearfashion';


async function connect() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        let connected_database = client.db(MONGODB_DB_NAME)
        console.log('Connected to database ')
        return connected_database
    }
    catch (err) {
        console.error(`Error connecting to the database. \n${err}`);
    }
}
//connect()


const all_products = require('./all_scraped.json');
async function insert_products(products) {
    const db = await connect();
    const collection = db.collection('products');
    for (brand_products of products) {
        const result = collection.insertMany(brand_products);
    }
}
//insert_products([all_products])

//Find all products related to a given brand
brand = "montlimart"
async function find_by_brand(brand) {
    const db = await connect();
    const collection = db.collection('products');
    var query = {
        brand: brand
    };
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
//find_by_brand(brand)

//Find all products less than a price
price = 10
async function find_by_price(price) {
    const db = await connect();
    const collection = db.collection('products');
    var query = { price: { $lt: price } }
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
//find_by_price(price)

//Find all products sorted by price (desc)
async function sort_by_price() {
    const db = await connect();
    const collection = db.collection('products');
    var query = [{ $sort: { "price": -1 } }]
    collection.aggregate(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
// sort_by_price()