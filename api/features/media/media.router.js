const express = require("express");
const router = express.Router();
const {getAllMedia} = require("./media.controller")

router.get("/", getAllMedia)

module.exports = router; 