const { registerAdmin } = require("../controllers/authController");

const router = require("express").Router();


router.route("/register").post(registerAdmin)


module.exports = router;