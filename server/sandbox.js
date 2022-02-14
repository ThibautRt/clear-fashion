/* eslint-disable no-console, no-process-exit */
const fs = require('fs')

const dedicatedbrand = require('./sources/dedicatedbrand');
const adressebrand = require('./sources/adressebrand');
const montlimartbrand = require('./sources/montlimartbrand');


async function sandbox_dedicated(eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

      console.log(products);
      fs.writeFile(`dedicated_scraped.json`, JSON.stringify(products), err => {
          if (err) {
              console.error(err);
              return
          }
      });
    console.log('done');
  } catch (e) {
    console.error(e);
  }
}

async function sandbox_adresse(eshop = 'https://adresse.paris/602-nouveautes') {
    try {
        console.log(`🕵️‍♀️  browsing ${eshop} source`);

        const products = await adressebrand.scrape(eshop);

        console.log(products);
        fs.writeFile(`adresse_scraped.json`, JSON.stringify(products), err => {
            if (err) {
                console.error(err);
                return
            }
        });
        console.log('done');
    } catch (e) {
        console.error(e);
    }
}

async function sandbox_montlimart(eshop = 'https://www.montlimart.com/chaussures.html') {
    try {
        console.log(`🕵️‍♀️  browsing ${eshop} source`);

        const products = await montlimartbrand.scrape(eshop);

        console.log(products);
        fs.writeFile(`montlimart_scraped.json`, JSON.stringify(products), err => {
            if (err) {
                console.error(err);
                return
            }
        });
        console.log('done');
    } catch (e) {
        console.error(e);
    }
}

const [,, eshop] = process.argv;

sandbox_dedicated(eshop);
sandbox_adresse(eshop);
sandbox_montlimart(eshop);