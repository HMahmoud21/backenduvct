const express = require("express");
const router = express.Router(); 
const evenementController=require("../Controllers/evenementController")

router.post("/addevent/:id",evenementController.createEvenement)
router.get("/getevent/:uuid",evenementController.getEvenemetinstr)
router.get("/searchBytitle/:title",evenementController.searchAllEventByTitle)
router.get("/searchbydate/:datedeb",evenementController.searchAllEventByDate)
router.patch("/archive/:uuid",evenementController.archiver)
router.get("/evenetarchiver",evenementController.getArchiveEvents)
router.delete("/supprimer/:uuid",evenementController.deleteEvenement)
router.get("/allevent",evenementController.getAllEvents)
router.patch("/publier/:uuid",evenementController.Publier)
router.patch("modifierevenet/:uuid",evenementController.updateEvent)
module.exports = router;