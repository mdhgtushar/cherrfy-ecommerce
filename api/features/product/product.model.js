const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    ali_data: {
       type: mongoose.Schema.Types.Mixed , // এখানে সব দেশের ডেটা JSON আকারে থাকবে
        required: false
    }
    // name: {
    //     type: String,
    //     required: true,
    // },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    // image: {
    //     type: String,
    //     required: true,
    // },
    // url: {
    //     type: String,
    //     required: true,
    // },
    // description: {
    //     type: String,
    //     required: true,
    // },
    // category: {
    //     type: String,
    //     required: true,
    // },
});

module.exports = mongoose.model('Product', productSchema);
