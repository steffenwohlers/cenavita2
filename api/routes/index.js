var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products.controllers.js');

router
  .route('/products')
  .get(ctrlProducts.productsGetAll)
  .post(ctrlProducts.productsAddOne);

router
  .route('/products/:productId')
  .get(ctrlProducts.productsGetOne)
  .put(ctrlProducts.productsUpdateOne)
  .delete(ctrlProducts.deleteOne);




module.exports = router;