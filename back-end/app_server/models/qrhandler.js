var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientsPicturesSchema = new Schema({
    
    image:{
        name:String,
        data:Buffer,
        contentType:String
    }

})

module.exports = mongoose.model('Qrpictures', ClientsPicturesSchema)