const { getAllUsers, getUserById } = require("../controllers/userController");

const router = require("express").Router();


router.route("/").get(getAllUsers)
router.route("/:id").get(getUserById)


module.exports = router;