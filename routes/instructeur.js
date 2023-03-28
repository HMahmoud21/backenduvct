const instructeur= require("../Controllers/Instructeur");
const express = require("express");



const router = express.Router();

router.post("/ajouterinstr",instructeur.ajouterInstructeur,);
router.get("/getinstr", instructeur.getInstructeur);
router.delete("/supprimerinstr",instructeur.deleteInstructeur);
module.exports = router;