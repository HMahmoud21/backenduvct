const express = require("express");
const router = express.Router(); 
const sessionController=require("../Controllers/sessionController")

router.post("/adds/:uuid",sessionController.addSession)
router.get("/gettallsession",sessionController.getSession)

module.exports = router;