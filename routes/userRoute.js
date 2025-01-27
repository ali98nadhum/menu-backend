const { getAllUsers, getUserById, deleteUser } = require("../controllers/userController");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");


router.route("/")
.get( verifyToken, getAllUsers)

router.route("/:id")
.get(verifyToken , getUserById)
.delete(verifyToken , deleteUser)


module.exports = router;