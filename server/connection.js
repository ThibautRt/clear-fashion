const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = "mongodb+srv://thibautrt:Choucroute@clear-fashion.1be5z.mongodb.net/clear-fashion?retryWrites=true&w=majority";
const MONGODB_NAME = 'clearfashion';


async function connect() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        let connected_database = client.db(MONGODB_NAME)
        console.log('Connected to database ')
        return connected_database
    }
    catch (err) {
        console.error(`Error connecting to the database. \n${err}`);
    }
}
//connect()


const all_products = require('./all_scraped.json');
async function insert_products(clear_fashion) {
    const db = await connect();
    const collection = db.collection('clear_fashion');
    for (brand_products of clear_fashion) {
        const result = collection.insertMany(brand_products);
    }
}
//insert_products([all_products])

module.exports.find_by_id = async function find_by_id(id) {
    try {
        const db = await connect();
        const collection = db.collection('clear_fashion');
        const query = { '_id': ObjectId(id) };
        const result = await collection.find(query);
        return result.toArray();
        
    } catch (error) {
        console.error('find_by_id failed : ', error);
        return null;
    }
}
module.exports.find_limit = async (query, options) => {
    try {
        const db = await connect();
        const collection = db.collection('clear_fashion');
        const result = await collection.find(query).limit(options.limit).toArray();

        return result;
    } catch (error) {
        console.error('collection.find...', error);
        return null;
    }
};


//Find all products related to a given brand
brand = "montlimart"
async function find_by_brand(brand) {
    const db = await connect();
    const collection = db.collection('clear_fashion');
    var query = { brand: brand };
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
//find_by_brand(brand)

//Find all products less than a price
price = 100
async function find_by_price(price) {
    const db = await connect();
    const collection = db.collection('clear_fashion');
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
    const collection = db.collection('clear_fashion');
    var query = [{ $sort: { "price": -1 } }]
    collection.aggregate(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
//sort_by_price()