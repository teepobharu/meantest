const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/signup", UserController.createUser);

// Clip 9 Auth
router.post('/login', UserController.userLogin);
module.exports = router;