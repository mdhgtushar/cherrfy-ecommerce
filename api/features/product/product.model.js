const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    ali_data: {
       type: mongoose.Schema.Types.Mixed ,
        required: false
    }  
});

module.exports = mongoose.model('Product', productSchema);
