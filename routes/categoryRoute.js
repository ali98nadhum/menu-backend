const { getAllCategory } = require("../controllers/categoryController");

const router = require("express").Router();


router.route("/").get(getAllCategory)

module.exports = router;