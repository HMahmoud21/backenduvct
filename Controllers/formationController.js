const Instructeur = require("../models/Instructeur");
const Formation=require("../models/formation");
const {Op} =require("sequelize");


const formationController = {
  createFormation: async (req, res) => {
    const { title, categorie, status, price, numero,offre,instructeurUUid} = req.body; 
    try {
      // Vérifiez si une formation avec le même numéro existe déjà dans la base de données.
      const formation = await Formation.findOne({ where: { numero: numero } });
      if (formation) {
        return res.status(409).json({ msg: "La formation existe déjà" }); // Utilisation du code d'état 409 Conflict pour indiquer que la demande ne peut être traitée en raison d'un conflit avec les ressources existantes.
      }

      // Créer une nouvelle formation avec l'ID de l'instructeur associé.
      const newFormation = await Formation.create({
        title: title,
        categorie: categorie,
        status: status,
        price: price,
        numero: numero,
        offre:offre,
        instructeurUUid: req.body.instructeurUUid,//req.params
       //instructeurId: req.instructeurId,
      });

      res.status(201).json({ msg: "Formation créée avec succès", formation: newFormation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Une erreur est survenue lors de la création de la formation" });
    }
  },
  getFormations :async (req, res) =>{
    try {
      let response;
      
          response = await Formation.findAll({
              attributes:['title','offre','categorie','createdAt'],
              include:[{
                model: Instructeur,
                attributes:['name']
            }]
              
          });
      
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
},
publier:async(req,res)=>{
  try {
    const product = await Formation.findOne({
      where: {
        numero: req.body.numero
      }
    });
    if (!product) return res.status(404).json({msg: "La formation n'existe pas."});

    const { numero } = req.body;

    // Vérification du rôle de l'utilisateur (ici admin)
    //if (req.role !== "admin") {
      //return res.status(403).json({ msg: "Vous n'êtes pas autorisé à publier cette formation." });
    //}

    // Mise à jour du statut de la formation de 0 à 1
    await Formation.update(
      { 
        status: 1
      },
      {
        where: {
          numero: numero
        }
      }
    );

    res.status(201).json({ msg: "La formation a été publiée avec succès." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }




},
depublier:async(req,res)=>{
  try {
    const formation = await Formation.findOne({
      where: {
        numero: req.body.numero 
       
        
      }
    });
    if (!formation) return res.status(404).json({msg: "La formation n'existe pas."});

    const { numero } = req.body;

    // Vérification du rôle de l'utilisateur (ici admin)
    //if (req.role !== "admin") {
      //return res.status(403).json({ msg: "Vous n'êtes pas autorisé à publier cette formation." });
    //}

    // Mise à jour du statut de la formation de 0 à 1
    await Formation.update(
      { 
        status: 0
      },
      {
        where: {
          numero: numero,
       
        }
      }
    );

    res.status(201).json({ msg: "La formation a été dépubliée avec succès." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }




},
deleteFormation:async(req, res) =>{
  try {
      const product = await Formation.findOne({
          where:{
              numero: req.body.numero
          }
      });
      if(!product) return res.status(404).json({msg: "formation n'existe pas "});
       const numero=req.body.numero
     
          await Formation.destroy({
              where:{
               numero:numero
              }
          });
          res.status(200).json({msg: "formation supprimé "});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
      },
 getFormationsBynum :async (req, res) =>{
  const numero=req.body.numero
    try {
      let response;
      
          response = await Formation.findAll({
              attributes:['title','offre','categorie','createdAt'],
              include:[{
                model: Instructeur,
                attributes:['name']
            }],
            where:
            [
              numero===numero
            ]
              
          });
      
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
},


}
module.exports=formationController