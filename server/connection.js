// tuto : https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i
const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://clearfashion_user:clearfashion_user@cluster0.g1yua.mongodb.net/clearfashion?retryWrites=true&w=majority";
const MONGODB_DB_NAME = 'clearfashion';

async function connect() { try { const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); let connected_database = client.db(MONGODB_DB_NAME)        console.log('Connected to database ')        return connected_database } catch (err) { console.error(`Error connecting to the database. \n${err}`); } }//connect()

// Insert the products
const products = [{ id: "testproduct", name: "name" }, { id: "test2", age: 12 }];
const dedicated_products = require('./dedicated_scraped.json');
const montlimart_products = require('./montlimart_scraped.json');
const adresse_products = require('./adresse_scraped.json');
async function insert_products(products) {
    const db = await connect();
    const collection = db.collection('products');
    for (brand_products of products) {
        const result = collection.insertMany(brand_products);
    }
}
insert_products([dedicated_products, montlimart_products, adresse_products])