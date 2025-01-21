const { getSubCategorys, createSubCategory } = require("../controllers/subcategoryController");

const router = require("express").Router();


router.route("/")
.get(getSubCategorys)
.post(createSubCategory)


module.exports = router;