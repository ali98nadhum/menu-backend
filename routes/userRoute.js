const { getAllUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = require("express").Router();


router.route("/").get(getAllUsers)
router.route("/:id")
.get(getUserById)
.delete(deleteUser)


module.exports = router;