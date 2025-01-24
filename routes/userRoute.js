const { getAllUsers } = require("../controllers/userController");

const router = require("express").Router();


router.route("/").post(getAllUsers)


module.exports = router;