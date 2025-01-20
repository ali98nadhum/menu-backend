const { getAllCategory, createCategory } = require("../controllers/categoryController");

const router = require("express").Router();


router.route("/").get(getAllCategory)
router.route("/").post(createCategory);

module.exports = router;