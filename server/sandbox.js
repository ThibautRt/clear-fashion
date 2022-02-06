/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adressebrand = require('./sources/adressebrand');
const montlimartbrand = require('./sources/montlimartbrand');

async function sandbox_dedicated(eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox_adresse(eshop = 'https://adresse.paris/602-nouveautes') {
    try {
        console.log(`🕵️‍♀️  browsing ${eshop} source`);

        const products = await adressebrand.scrape(eshop);

        console.log(products);
        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

async function sandbox_montlimart(eshop = 'https://www.montlimart.com/chaussures.html') {
    try {
        console.log(`🕵️‍♀️  browsing ${eshop} source`);

        const products = await montlimartbrand.scrape(eshop);

        console.log(products);
        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const [,, eshop] = process.argv;

sandbox_montlimart(eshop);