const express = require("express");
const router = express.Router(); 
const AchatController= require("../Controllers/AchatContoller")

router.post("/achat/:uuid/:id",AchatController.addAchat)
router.get("/getachat",AchatController.getAchat)
router.get("/getfor",AchatController.getAchatfor)//formation achete
router.get("/getpar/:uuid",AchatController.getAchatpar)
router.get("/getallachat",AchatController.getAllAchat)
router.get("/mesachat/:uuid",AchatController.MesAchat)
router.patch("/favoris/:uuid",AchatController.favoris)
router.get("/mesfavoris/:uuid",AchatController.Mesfavoris)
router.patch("/normal/:uuid",AchatController.normal)


module.exports = router;

