const { getAllProducts, createProduct, getOneProduct } = require("../controllers/productController");

const router = require("express").Router();


router.route("/")
.get(getAllProducts)
.post(createProduct)

router.route("/:id")
.get(getOneProduct)


module.exports = router;