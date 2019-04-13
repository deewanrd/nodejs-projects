const fetch = require('fetch');
const url = 'https://s3.ap-south-1.amazonaws.com/ss-local-files/products.json';

exports.fetchProducts = function (req, res) {
  fetch.fetchUrl(url, function (error, meta, body) {
    if (error) {
      console.error(`Error fetching products: ${error}`);
      return res.status(400).send({ 'err': 'Error fetching products' });
    }
    return res.status(200).send(body);
  });
};