const express = require("express");
const {
  getAllConfig
} = require("../controllers/ConfigController");

const router = express.Router();

router.route("/").get(getAllConfig);

module.exports = router;
