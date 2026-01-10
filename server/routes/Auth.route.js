const express = require("express");
const { LoginUser, SignupUser } = require("../controller/Auth.controller");

const router = express.Router();

router.post("/login", LoginUser);

router.post("/signup", SignupUser);

module.exports = router;
