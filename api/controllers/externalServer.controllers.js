var http = require('http');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var extServer = require('../externalServers/externalServer');
var extServerOptions = extServer.extServerOptions;
var fixedExtServerOptionsPath = extServer.extServerOptions.path;

module.exports.extProdcutsGetOne = function (res, productId) {
    console.log("Searching for following ID in external DB. ID:", productId);
    
    var result = {
        status : 500,
        message : {"message" : "Init"}
    };

    extServerOptions.path = extServerOptions.path + '/' + productId;
   http.request(extServerOptions, function (_res) {
       _res.setEncoding('utf8');
       _res.on('data', function (data) {
           console.log(data);

            if((!data) || (data == null) || (data == "null")) {
                console.log("In nicht Daten gefunden");
                result.status = 500;
                result.message = {"message" : "Could not find data in external Database"};
           } else {
            console.log("In Daten gefunden");
               result.status = 200;
               result.message = JSON.parse(data);

               Product.create(result.message, (err, product) => {
                   if(err){
                       console.log("Fehler beim erstellen")
                       console.log(err);
                   } else {
                       console.log("added external product into internal DB");
                       console.log(product);
                   }
               })
            }
            res
            .status(result.status)
            .json(result.message);
        });
        
    }).end();
    extServerOptions.path = fixedExtServerOptionsPath;
};












// module.exports.extProdcutsGetOne = function (req, res) {
//     var productId = req.params.productId;
//     extServerOptions.path = extServerOptions.path + '/' + productId;
//    http.request(extServerOptions, function (_res) {
//        _res.setEncoding('utf8');
//        _res.on('data', function (data) {
//            result = JSON.parse(data);
//            console.log(result);
//            console.log(extServerOptions.path);
//            res.json(result);
//        });

//    }).end();
// };