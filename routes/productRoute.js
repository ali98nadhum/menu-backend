const { getProducts, createProduct } = require("../controllers/productController");

const router = require("express").Router();


router.route("/")
.get(getProducts)
.post(createProduct)


module.exports = router;