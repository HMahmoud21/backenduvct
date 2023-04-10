const express = require("express");
const router = express.Router(); 
const sessionController=require("../Controllers/sessionController")

router.post("/adds",sessionController.addSession)
//router.get("/getallsession",sessionController.getSession)
//router.patch("/updatesession",sessionController.updateSession)
//router.delete("/supprimersession",sessionController.deleteSession)



module.exports = router;