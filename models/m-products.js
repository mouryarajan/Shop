const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    images: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tblcategory'
    },
    price: {
        type: Number,
        required: true
    },
    colorFlag: {
        type: Boolean,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    colors: {
        items: [
            {
                color: {
                    type: String,
                    required: false
                },
                image: {
                    type: String,
                    required: false
                }
            }
        ]
    },
    type: {
        type: String,
        required: false
    },
    s: {
        type: Number,
        required: false
    },
    m: {
        type: Number,
        required: false
    },
    l: {
        type: Number,
        required: false
    },
    xl: {
        type: Number,
        required: false
    },
    xxl: {
        type: Number,
        required: false
    },
    xxxl: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    fabric: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    catologue: {
        type: String,
        required: false
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tblstore'
    },
    review: {
        items: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'tbluser'
                },
                name: {
                    type: String,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                rating: {
                    type: Number,
                    required: false
                }
            }
        ]
    }
});

module.exports = mongoose.model('tblproducts', productSchema);