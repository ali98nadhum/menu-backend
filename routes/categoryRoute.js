const { getAllCategory, createCategory, getOneCategory, deleteCategory, updateCategoey } = require("../controllers/categoryController");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");

router.route("/")
.get(getAllCategory)
.post(verifyToken , createCategory)

router.route("/:id")
.get(getOneCategory)
.delete(verifyToken , deleteCategory)
.put(verifyToken , updateCategoey)

module.exports = router;