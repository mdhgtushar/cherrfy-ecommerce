const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,

    },
    description: {
        type: String,
    },
    subcategories: [{
        name: {
            type: String,

        },
        description: {
            type: String,

        },
        subcategories: [{
            name: {
                type: String,

            },
            description: {
                type: String,

            },
            subcategories: [{
                name: {
                    type: String,

                },
                description: {
                    type: String,

                },
            }]
        }]
    }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;