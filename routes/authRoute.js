const { registerAdmin, loginAdmin } = require("../controllers/authController");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");


router.route("/register").post(verifyToken ,registerAdmin)
router.route("/login").post(loginAdmin)


module.exports = router;