const fs = require("fs")
const dedicated = require('./scraped/DEDICATED.json');
const montlimart = require('./scraped/Montlimart.json');
const adresse = require('./scraped/ADRESSE_Paris.json');


for (element of dedicated) {
    element["brand"] = "dedicatedbrand"
}
for (element of montlimart) {
    element["brand"] = "montlimart"
}
for (element of adresse) {
    element["brand"] = "adresseparis"
}

var all_products = dedicated.concat(montlimart, adresse)

function WriteJsonFile(products, path) {
    products = JSON.stringify(products);
    fs.writeFile(path, products, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('File written successfully');
        }
    });
}
WriteJsonFile(all_products, "./scraped/all_scraped.json")

