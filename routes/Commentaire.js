const express = require("express");
const router = express.Router(); 
const CommentaireController=require("../Controllers/CommentaireController")

router.post("/addcommentaire/:uuid/:id",CommentaireController.addCommentaire)
router.get("/getallcomment",CommentaireController.getcomment)
router.get("/rechercher",CommentaireController.Rechercher)
router.patch("/repondre/:uuid",CommentaireController.Reponse)


module.exports = router;