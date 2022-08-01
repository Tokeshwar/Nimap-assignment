const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({

    productName: { type: String, trim: true },
    categoryId: { type: ObjectId, ref: 'Category' },
    price: { type: Number },
    stock: { type: Number },
    idDeleted: { type: Boolean, default: false }

});

module.exports = mongoose.model('Product', productSchema)