const { getAllProducts, createProduct, getOneProduct, deleteProduct } = require("../controllers/productController");

const router = require("express").Router();


router.route("/")
.get(getAllProducts)
.post(createProduct)

router.route("/:id")
.get(getOneProduct)
.delete(deleteProduct)


module.exports = router;