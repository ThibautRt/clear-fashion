const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  var saved_list =[]

  return $('.product_list grid row .ajax block product')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );
      saved_list.push({ name, price })
      return {name, price};
    })
        .get();
    fs.writeFile('C:\Users\thiba\Desktop\clear-fashion\server\saved.txt', saved_list, { flag: 'a+' }, err => { })

};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

        return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
