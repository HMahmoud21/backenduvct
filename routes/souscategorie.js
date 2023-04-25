const express = require("express");
const router = express.Router(); 
const souscategorieController=require("../Controllers/souscategorieController");

router.post("/addscategorie/:id",souscategorieController.createsouscategorie)
router.get("/getall",souscategorieController.getallscat)
router.get("/getbyid",souscategorieController.getscatById)
router.patch("/update",souscategorieController.updatecat)
router.delete("/supprimer",souscategorieController.deletesoucat)



module.exports = router;