const express = require("express");
const apiController = require("../controllers/apiController");

const router = express.Router();

router.get("/", apiController.getHome);
router.patch("/:id", apiController.addVote);

module.exports = router;
