const { getAllCategory, createCategory, getOneCategory, deleteCategory } = require("../controllers/categoryController");

const router = require("express").Router();


router.route("/")
.get(getAllCategory)
.post(createCategory)

router.route("/:id")
.get(getOneCategory)
.delete(deleteCategory)

module.exports = router;