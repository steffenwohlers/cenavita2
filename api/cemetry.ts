//ALTER GET Controller
// module.exports.productsGetOne = function(req, res) {
//   var id = req.params.productId;
//   console.log('GET the Product: ', id);

//   Product
//   .findById(id)
//   .exec(function(err, doc) {
//     var response = {
//       status : 200,
//       message : doc
//     }
//     if(err) {
      
//       console.log("Error finding specific Product")
//         response.status = 500;
//         response.message = err;

//       // TODO Falls nicht gefunden (= leer), schaue in externer DB nach
//     } else if (!doc) {
//       crtlExtProducts.extProdcutsGetOne(this.req, this.res);
//       response.status = 404;
//       response.message = {"message" : "Product ID not found"};
//     }

//     res
//       .status(response.status)
//       .json(response.message);
//   });
// };