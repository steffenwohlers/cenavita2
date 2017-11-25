var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var crtlExtProducts = require('./externalServer.controllers')

module.exports.productsGetAll = function(req, res) {

  console.log('GET the products');
  console.log(req.query);

  Product
    .find()
    .exec(function(err, products) {
      if(err) {
        console.log("Error finding Product");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found Products", products.length)
        res
          .json(products)
      }
    })
};

module.exports.productsGetOne = function(req, res) {
  var id = req.params.productId;
  console.log('GET the Product: ', id);

  Product
  .findById(id)
  .exec(function(err, doc) {
    var response = {
      status : 200,
      message : doc
    }
    if(err) {
      
      console.log("Error finding specific Product")
        response.status = 500;
        response.message = err;

      // TODO Falls nicht gefunden (= leer), schaue in externer DB nach
    } else if ((!doc) || (doc == null)) {
      crtlExtProducts.extProdcutsGetOne(res, id);

    } else {
      res
        .status(response.status)
        .json(response.message);
    }

  });
};

module.exports.productsAddOne = function(req, res) {

  Product
    .create({
      _id : req.body._id,
      manufacturer : req.body.manufacturer,
      name : req.body.name,
      vegetarian : req.body.vegetarian,
      vegan : req.body.vegan,
      glutenfree : req.body.glutenfree

    }, function (err, product) {
      if(err){
        console.log("Error creating product");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Producted created", product);
        res
          .status(201)
          .json(product);
      }
    });
}

module.exports.productsUpdateOne = function(req, res) {
  var productId = req.params.productId;
  console.log("GET productId", productId);

  Product
    .findById(productId)
    .exec((err, doc) => {
      var response = {
        status : 200,
        message : doc
      };
      if(err) {
        console.log("Error finding product");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {"message": "Product ID not found"}
      };

      if( response.status !== 200){
        res  
          .status(response.status)
          .json(response.message);
      } else { 
        doc.gtin = req.body.gtin;
        doc.manufacturer = req.body.manufacturer;
        doc.name = req.body.name;
        doc.vegetarian = req.body.vegetarian;
        doc.vegan = req.body.vegan;
        doc.glutenfree = req.body.glutenfree;
        
        doc.save((err, productUpdated) => {
          if(err) {
              res
                .status(500)
                .json(err);
          } else {
              res
                .status(204)
                .json();
          }
        });
      }
    });
};

module.exports.deleteOne = (req, res) => {
  var productId = req.params.productId;

  Product
    .findByIdAndRemove(productId)
    .exec((err, product)=>{
      if (err) {
        console.log("Could not delete product with id:", productId);
        res
          .status(404)
          .json(err)
      }else {
        console.log("Product deleted, id: ", productId);
        res
          .status(204)
          .json();
      }
    });
};