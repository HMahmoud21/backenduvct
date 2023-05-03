const Formation = require("../models/formation")
const User =require("../models/UserModel")
const Commentaire=require("../models/commentaire")

const CommentaireController={
  // ajout d'un commentaires (apprenant)
addCommentaire:async(req,res)=>{
        const uuid=req.params.uuid
        const id=req.params.id
        const {NomSession,Message}=req.body
        try{
               
        const newCommentaire= await Commentaire.create({
            envoyerpar:uuid,
            formationId:id,
            NomSession:NomSession,
            Message:Message




          });
    
          res.status(201).json({ message: "votre commentaire est publié ", newCommentaire});
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Une erreur est survenue lors de la publication " });
        }
},
// voir la liste des commentaire(instructeur)
getcomment:async(req,res)=>{
      let response 
   
      try{
      response = await Commentaire.findAll({
          attributes:['uuid','createdAt','Message','NomSession'],
     
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Formation,
        attributes: ['title'],
      },
    ],
  });

res.status(200).json(response);
} catch (error) {
res.status(500).json({message: error.message});
}
},
//recherche d'un commentaire par date de publication 
Rechercher:async(req,res)=>{
  const date=req.body 
  console.log(date)

  try {
    let response;
    
    response = await Commentaire.findAll({
      attributes: ['uuid','createdAt','Message','NomSession'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Formation,
          attributes: ['title'],
        },
      ],
      where: {
        createdAt: date
      }
    });
    
    if (response === null || response.length === 0) {
      res.status(404).json({ message: "Aucun commentaire trouvé pour la date spécifiée." });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
//répondre sur un commentaire 
// Reponse:async(req,res)=>{
  
//   const uuid=req.params.uuid

// try{
//     await Commentaire.update({
//       response:req.body.response
//     },{
//         where:{
//            uuid:uuid
//         }
//     });
// res.status(200).json({message: " votre réponse est bien envoyé "});
// } catch (error) {
// res.status(500).json({message: error.message});
// }

// }
Reponse: async (req, res) => {
 


  try {
    const reponse= req.body.response 
    const uuid = req.params.uuid ;console.log(uuid)
    // Vérifie si le commentaire existe
    const commentaire = await Commentaire.findOne({
      where: {
        uuid: uuid
      }
    });
   
    if (!commentaire) {
      return res.status(404).json({ message: "Le commentaire n'existe pas." });
    }

    // Vérifie si la nouvelle valeur est différente de la valeur existante
     if (commentaire.response === req.body.response) {
      return res.status(400).json({ message: "La nouvelle valeur de réponse est identique à la valeur existante." });
    }

    // Met à jour le commentaire avec la nouvelle valeur de réponse
    const result = await Commentaire.update(
      { response: reponse},
      {
        where: {
          uuid: uuid
        }
      }
    );

    if (result[0] === 0) {
      return res.status(500).json({ message: "Impossible de mettre à jour le commentaire." });
    }

    // Renvoie une réponse avec un message de succès
    return res.status(200).json({ message: "Votre réponse a été envoyée avec succès." });
  } catch (error) {
    // Gère les erreurs et renvoie une réponse avec un code d'état 500
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du commentaire." });
  }
}


}

module.exports=CommentaireController
