var mongoose = require('mongoose');

// Die URL zu unserer DB
var dburl = 'mongodb://cenavita:Loos123!@ds042687.mlab.com:42687/cenavita';
var retry = null;
mongoose.connect(dburl);

// Gibt auf der Konsole den status der Verbindung aus
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
// Gibt auf der Konsole den status der Verbindung aus
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// Wird ausgeführt wenn Vebridnung beendet oder restarted wird.
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
}

// restart
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Vebridung trennen
process.on('SIGINT', function() {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});


process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});

//Laden der models
require('./products.model');
