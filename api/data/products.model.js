var mongoose = require('mongoose');

// Gibt das Schema für die Produkte vor
var productSchema = new mongoose.Schema({
    _id : {
        type: String,
        required : true
    },
    manufacturer : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    vegetarian : {
        type: Boolean,
        required : true
    },
    vegan : {
        type: Boolean,
        required : true
    },
    glutenfree : {
        type: Boolean,
        required : true
    }
});

    mongoose.model('Product', productSchema);
