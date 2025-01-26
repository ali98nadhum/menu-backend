const { getAllCategory, createCategory, getOneCategory, deleteCategory, updateCategoey } = require("../controllers/categoryController");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const photoUpload = require("../middlewares/photoUpload");

router.route("/")
.get(getAllCategory)
.post(verifyToken, photoUpload.single("image") , createCategory)

router.route("/:id")
.get(getOneCategory)
.delete(verifyToken , deleteCategory)
.put(verifyToken , photoUpload.single("image") , updateCategoey)

module.exports = router;