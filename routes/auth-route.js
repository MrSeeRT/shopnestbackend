const express = require("express");
const router = express.Router();
const authControllers= require("../controller/auth-controller")
const authMiddleware= require("../authMiddleware/auth-middleware")

router.route("/").get(authControllers.home)
router.route("/register").post(authControllers.register)
router.route("/login").post(authControllers.login);
router.route("/contact").post(authControllers.contact);
router.route("/cart").post(authControllers.cart)

router.route("/user").get(authMiddleware,authControllers.user);


module.exports = router;

