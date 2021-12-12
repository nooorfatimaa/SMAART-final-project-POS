var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name : {
        type: String,
        // required: true,
    },
    code : {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: false,
    },
    picture: {
        type: String,  //change to buffer later
        // required: false,
    }
});

module.exports = mongoose.model('Category', CategorySchema);