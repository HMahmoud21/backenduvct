const express =require("express");
const formateurController=require("../Controllers/formateurController");
const admin =require("../middleware/admin");
const router=express.Router();
router.get('/formateurs',formateurController.getFormateur,);
router.post('/createFormateur', formateurController.createFormateur);
router.delete('/supprimerformateur',formateurController.deleteformateur,admin);
module.exports = router;