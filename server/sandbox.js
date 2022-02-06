/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adressebrand = require('./sources/adressebrand');

async function sandbox(eshop = 'https://adresse.paris/602-nouveautes') {
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

const [,, eshop] = process.argv;

/* const list_dedicated = [
    'https://www.dedicatedbrand.com/en/men/news',
    'https://www.dedicatedbrand.com/en/men/t-shirts',
    'https://www.dedicatedbrand.com/en/men/basics',
    'https://www.dedicatedbrand.com/en/men/sweats',
    'https://www.dedicatedbrand.com/en/men/knitwear',
    'https://www.dedicatedbrand.com/en/men/shirts',
    'https://www.dedicatedbrand.com/en/men/bottoms',
    'https://www.dedicatedbrand.com/en/men/jackets',
    'https://www.dedicatedbrand.com/en/men/caps-and-beanies',
    'https://www.dedicatedbrand.com/en/men/socks',
    'https://www.dedicatedbrand.com/en/men/underwear',
    'https://www.dedicatedbrand.com/en/men/swim-shorts',
    'https://www.dedicatedbrand.com/en/men/tote-bags',
    'https://www.dedicatedbrand.com/en/men/sale',
    'https://www.dedicatedbrand.com/en/women/news',
    'https://www.dedicatedbrand.com/en/women/t-shirts-and-tops',
    'https://www.dedicatedbrand.com/en/women/basics',
    'https://www.dedicatedbrand.com/en/women/sweats',
    'https://www.dedicatedbrand.com/en/women/knitwear',
    'https://www.dedicatedbrand.com/en/women/dresses',
    'https://www.dedicatedbrand.com/en/women/shirts',
    'https://www.dedicatedbrand.com/en/women/bottoms',
    'https://www.dedicatedbrand.com/en/women/jackets',
    'https://www.dedicatedbrand.com/en/women/caps-and-beanies',
    'https://www.dedicatedbrand.com/en/women/socks',
    'https://www.dedicatedbrand.com/en/women/underwear',
    'https://www.dedicatedbrand.com/en/women/swimwear',
    'https://www.dedicatedbrand.com/en/women/tote-bags',
    'https://www.dedicatedbrand.com/en/women/sale',
    'https://www.dedicatedbrand.com/en/kids/t-shirts',
    'https://www.dedicatedbrand.com/en/kids/sweatshirts',
    'https://www.dedicatedbrand.com/en/kids/bottoms',
    'https://www.dedicatedbrand.com/en/kids/swimwear',
    'https://www.dedicatedbrand.com/en/kids/sale'
]; */



sandbox(eshop);
//console.log(list_dedicated)
//for (var i = 0; i < list_dedicated.length; i++) {
  //  sandbox(list_dedicated[i])
//}