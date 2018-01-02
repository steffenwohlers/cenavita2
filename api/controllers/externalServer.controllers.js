/**
 * Logik für die Produktsuche in der externen DB
 */
var http = require('http');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var extServer = require('../externalServers/externalServer');
var extServerOptions = extServer.extServerOptions;
var fixedExtServerOptionsPath = extServer.extServerOptions.path;

//Funktion, die das JSON File eines Produktes ausgibt
module.exports.extProdcutsGetOne = function (res, productId) {
    console.log("Searching for following ID in external DB. ID:", productId);

    //Objekt, welches als Response an das Frontend gesendet wird
    var result = {
        status : 500,
        message : {"message" : "Init"}
    };

    // Pfad unter dem die JSON zu finden ist
    extServerOptions.path = extServerOptions.path + '/' + productId;
    
    //HTTP Request an den externen Server
    http.request(extServerOptions, function (_res) {
       _res.setEncoding('utf8');
       _res.on('data', function (data) {
           console.log(data);

            //Falls keine Daten gefunden wurden...
            if((!data) || (data == null) || (data == "null")) {
                //... wird es auf der Konsole ausgegeben
                console.log("In nicht Daten gefunden");
                //und in das result geschrieben
                result.status = 500;
                result.message = {"message" : "Could not find data in external Database"};
            //... ansonsten ...
           } else {


            //schreibe die empfangen Daten in das result    
            console.log("In Daten gefunden");
                result.status = 200;
                result.message = JSON.parse(data);

                // schreibe das Product aus der externen Datenbank in unsere interne Datenabnk               
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
            //Sende unser result
            res
            .status(result.status)
            .json(result.message);
        });
        
    }).end();
    // Der Pfad wird wieder zurückgesetzt
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