const express = require("express");
const FormationController=require("../Controllers/FormationController");

const router = express.Router(); 

router.post('/addFormation/:id',FormationController.CreateFormation);
router.get('/gatallformation',FormationController.getFormations);
router.get("/getformationByTitle",FormationController.getFormationsByTitle);
router.patch("/publier/:uuid",FormationController.publier);
router.patch("/depulier/:uuid",FormationController.depublier);
router.patch("/archiver/:uuid",FormationController.archiver)
router.delete("supprmierformation",FormationController.deleteFormation);
router.patch("/modification/:uuid",FormationController.updateFormation)




module.exports=router