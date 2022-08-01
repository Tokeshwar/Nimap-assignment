const express = require("express")
const router = express.Router()

const categoryController = require("../controller/categoryController");
const productController = require("../controller/productController");

// Category
router.post('/category', categoryController.createCategory);
router.get('/categories/:categoryId', categoryController.getCategorybyid);
router.put("/categories/:categoryId",categoryController.updateCategory);
router.delete("/categories/:categoryId",categoryController.deleteCategory);

// Product
router.post('/product', productController.createProduct);
router.get('/products/:productId', productController.getProductById);
router.put('/products/:productId', productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);
router.get('/products', productController.productsList);

module.exports = router;