const { getAllCategory, createCategory, getOneCategory } = require("../controllers/categoryController");

const router = require("express").Router();


router.route("/")
.get(getAllCategory)
.post(createCategory);

router.route("/:id")
.get(getOneCategory)

module.exports = router;