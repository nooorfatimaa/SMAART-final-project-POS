var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//sales analysis will be done using this schema
var OrderSchema = new Schema({
    // customer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Customer',
    //     required: true,
    // },
    // products: {
    //     type: [{
    //         sid: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'Product',
    //         }
    //     }],
    //     required: true,
    // },
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        // required: true,
    },
    // date: {
    //     type: Date,
    //     // required: true,
    // },
    total: {
        type: Number,
        // required: true,
    }, 
    itemCount: {
        type: Number,
        // required: true,
    },
    // orderNo: {
    //     type: Number,
    //     // required: true,
    // },
},
{
    timestamps : {
        createdAt: 'date',
    }
});

module.exports = mongoose.model('Order', OrderSchema);