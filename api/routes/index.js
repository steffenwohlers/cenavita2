var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products.controllers.js');

//hier wird angegeben, was passiert wenn ein Seitenaufruf geschieht
router
  .route('/products')
  // Wenn ein get befehl requested wird, dann führe die Funktion aus
  .get(ctrlProducts.productsGetAll)
  .post(ctrlProducts.productsAddOne);

router
  .route('/products/:productId')
  .get(ctrlProducts.productsGetOne)
  .put(ctrlProducts.productsUpdateOne)
  .delete(ctrlProducts.deleteOne);




module.exports = router;