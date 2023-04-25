const express = require("express");
const router = express.Router(); 
const ReclamationController=require('../Controllers/reclamationController')
router.post("/add/:uuid",ReclamationController.addreclamation)
router.get("/getall",ReclamationController.getallreclamation)
router.get("/getinfo/:uuid",ReclamationController.getreclamationById)
router.get("/getmyreclamation/:uuid",ReclamationController.getmyrecalation)
router.delete("/supprimer/:uuid",ReclamationController.deletereclamation)

module.exports = router;