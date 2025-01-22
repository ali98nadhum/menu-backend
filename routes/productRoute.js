const { getSubCategorys, createSubCategory } = require("../controllers/productController");

const router = require("express").Router();


router.route("/")
.get(getSubCategorys)
.post(createSubCategory)


module.exports = router;