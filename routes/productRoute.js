const { getAllProducts, createProduct, getOneProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");


router.route("/")
.get(getAllProducts)
.post(verifyToken , createProduct)

router.route("/:id")
.get(getOneProduct)
.delete(verifyToken , deleteProduct)
.put( verifyToken,updateProduct)


module.exports = router;