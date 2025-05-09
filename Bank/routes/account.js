const express = require("express");
const {
  listAccountController,
  createAccountController,
} = require("../controllers/account");
const router = express.Router();

router.get("/account", listAccountController);
router.post("/account", createAccountController);
module.exports = router;
