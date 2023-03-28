const express = require("express");
const router = express.Router(); 
const formationController= require("../Controllers/formationController")

router.post("/addformation",formationController.createFormation);
router.get("/getallformation",formationController.getFormations)
router.patch("/publier",formationController.publier)
router.patch("/depublier",formationController.depublier)
router.delete("/supprimer",formationController.deleteFormation)
router.get("/getbynum",formationController.getFormationsBynum)


module.exports = router;