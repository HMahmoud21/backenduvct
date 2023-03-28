const express = require("express");
const router = express.Router(); 
const evenementController=require("../Controllers/evenementController")

router.post("/addevent",evenementController.createEvenement)
module.exports = router;