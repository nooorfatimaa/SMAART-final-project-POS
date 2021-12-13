var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportlm = require('passport-local-mongoose')

var UserSchema = new Schema({
    name : {
        type: String,
        default:''
        // required: true,
    },
    role :{
        type: String,
        default:''
    },
    counterNo : {
        type: String,
        default:''
        // required: true,
    },
    dOb : {
        type: String,
        default:''
        // required: false,
    },
    address : {
        type: String,
        default:'' 
        // required: true,
    },
    contactNo: {
        type: String,
        default:''
        // required: true,
    },
    picture: {
        type: String,
        default:''
        // required: false,
    },
    admin:{
        type:Boolean,
        default:false
    }
});
//should be a user schema instead with role as cashier or admin
UserSchema.plugin(passportlm)
module.exports = mongoose.model('User', UserSchema);