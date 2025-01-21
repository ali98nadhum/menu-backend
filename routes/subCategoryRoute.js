const { getSubCategorys } = require("../controllers/subcategoryController");

const router = require("express").Router();


router.route("/")
.get(getSubCategorys);


module.exports = router;