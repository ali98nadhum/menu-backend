const { registerAdmin, loginAdmin } = require("../controllers/authController");

const router = require("express").Router();


router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)


module.exports = router;