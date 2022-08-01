const mongoose = require('mongoose');
const productModel = require('../model/productModel');
const categoryModel = require('../model/categoryModel');

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

const createProduct = async function (req, res) {
    try {
        const data = req.body;

        const { productName, categoryId, price, stock } = data;

        if (!isValid(productName)) {
            res.status(400).send({ status: false, message: 'Product name is required' })
            return
        }
        if (!isValid(categoryId)) {
            res.status(400).send({ status: false, message: 'categoryId is required' })
            return
        }

        if (!isValidObjectId(categoryId)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        if (!isValid(price)) {
            res.status(400).send({ status: false, message: 'price is required' })
            return
        }
        if (!isValid(stock)) {
            res.status(400).send({ status: false, message: 'stock is required' })
            return
        }

        let category = await categoryModel.findById(categoryId);
        if (!category) {
            res.status(404).send({ status: falase, massage: "Category does not exist..!!" });
        }

        const newProduct = await productModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: newProduct })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getProductById = async (req, res) => {

    try {
        const productId = req.params.productId;

        if (!isValidObjectId(productId)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const product = await productModel.findOne({ _id: productId, isDeleted: false });
        if (!product) return res.status(400).send({ status: false, message: "Product is deleted..!!" })

        return res.status(200).send({ status: true, message: "Success", data: product })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateProduct = async (req, res) => {

    try {
        let data = req.body
        const id = req.params.productId;

        if (!Object.keys(data).length > 0) return res.send({ status: false, message: "Please enter data for updation..!!" })

        if (!isValidObjectId(id)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const productPresent = await productModel.findById({ _id: id })

        if (!productPresent) return res.status(404).send({ status: false, message: "Product not found..!!" })


        const update = await productModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: data }, { new: true })

        if (!update) return res.status(400).send({ status: false, message: "Product is Deleted..!!" })

        return res.status(200).send({ status: true, message: "Success", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteProduct = async function (req, res) {
    try {
        const { productId } = req.params

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).send({ status: false, message: "Product not found" })
        }
        if (product.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Product is already deleted" })
        }
        const delProduct = await productModel.findByIdAndUpdate(productId, { isDeleted: true }, { new: true })
        return res.status(200).send({ status: true, message: "success", data: delProduct })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const productsList = async function (req, res) {
    try {
        let { page, limit } = req.query;
        if (!page) page = 1;
        if (!limit) limit = 10;
        const skip = (page - 1) * 10;
        const products = await productModel.find().skip(skip).limit(limit).populate('categoryId', 'categoryName');

        return res.send({ page: page, limit: limit, productDetails: products })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = { createProduct, getProductById, updateProduct, deleteProduct, productsList };