const Evenement= require("../models/evenement");
const User = require("../models/UserModel");
 
const {Op} =require("sequelize");


const evenementController = {
createEvenement: async (req, res) => {
        const { title, details, datedeb, datefin, nbTicket, price, typeEvent, affiche, ref } = req.body; 
        try {
          // Vérifiez si un evenement avec le même numéro existe déjà dans la base de données.
          const evenement = await Evenement.findOne({ where: { ref: ref } });
          if (evenement) {
            return res.status(409).json({ msg: "L'evenement existe déjà" }); // Utilisation du code d'état 409 Conflict pour indiquer que la demande ne peut être traitée en raison d'un conflit avec les ressources existantes.
          }
      
          // Créer une nouvelle evenement avec l'ID de l'instructeur et de l'admin associés.
          const newEvenement = await Evenement.create({
            title: title,
            details: details,
            datedeb: datedeb,
            datefin: datefin,
            nbTicket: nbTicket,
            typeEvent: typeEvent,
            affiche: affiche,
            ref: ref,
            price: price,
            postedBy: req.params.id,
          });
      
          res.status(201).json({ msg: "Evenement créé avec succès", evenement: newEvenement });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Une erreur est survenue lors de la création de l'evenement" });
        }
      },
getEvenemetinstr :async (req, res) =>{
        try {
          const uuid = req.params.uuid;
         
          let response;
          
              response = await Evenement.findAll({
                  attributes:['title','details','affiche'],
                  where:{
                       postedBy:uuid ,
                      
                      
                  },
                  include:[{
                    model: User,
                    attributes:['name']
                }],
             
                  
              });
          
          res.status(200).json(response);
      } catch (error) {
          res.status(500).json({msg: error.message});
      }
    },
getEvenemetadmin :async (req, res) =>{
      try {
        let response;
        
            response = await Evenement.findAll({
                attributes:['title','details',' datedeb','datefin', 'affiche'],
                include:[{
                  model: User,
                  attributes:['name']
              }],
                
            });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  },
deleteEvenement:async(req, res) =>{
      try {
        const uuid = req.params.uuid;
          const evenement = await Evenement.findOne({
              where:{
               UUid:uuid
              }
          });
          if(!evenement) return res.status(404).json({msg: "evenement n'existe pas "});
          
         
              await Evenement.destroy({
                  where:{
                    UUid:uuid
                  }
              });
              res.status(200).json({msg: "Evenemt supprimé "});
            } catch (error) {
                res.status(500).json({msg: error.message});
            }
  },
searchAllEventByTitle: async (req, res) => {
    try {
      let response;
      
          response = await Formation.findOne({
              attributes:['title','offre','categorie','createdAt'],
              include:[{
                model: User,
                attributes:['name']
            }],
            where:
            {
              title:req.params.title
            }
              
          });
      
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({msg: error.message});
  }

  },
searchAllEventByDate: async (req, res) => {
  try {
    let response;
    
        response = await Evenement.findOne({
            attributes:['title','offre','categorie','createdAt'],
            include:[{
              model: User,
              attributes:['name']
          }],
          where:
          {
          datedeb:req.params.title
          }
            
        });
    
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}
},
Publier:async(req,res)=>{
  try {
      const uuid = req.params.uuid;
      if (!uuid) return res.status(400).json({msg: "UUID manquant."});
  
      const product = await Evenement.findOne({
        where: {
          UUid: uuid
        }
      });
      if (!product) return res.status(404).json({msg: "evenement  n'existe pas."});
  
      await Evenement.update(
        { 
          status: "publier"
        },
        {
          where: {
            UUid: uuid
          }
        }
      );
  
      res.status(201).json({ msg: "evenement publie." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

archiver:async(req,res)=>{
  try {
      const uuid = req.params.uuid;
      if (!uuid) return res.status(400).json({msg: "UUID manquant."});
  
      const product = await Evenement.findOne({
        where: {
          UUid: uuid
        }
      });
      if (!product) return res.status(404).json({msg: "evenement  n'existe pas."});
  
      await Evenement.update(
        { 
          status: "archiver"
        },
        {
          where: {
            UUid: uuid
          }
        }
      );
  
      res.status(201).json({ msg: "evenement archiver." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
getArchiveEvents: async (req, res) => {
    try {
      let response;
      
          response = await Formation.findOne({
              attributes:['title','offre','categorie','createdAt'],
              include:[{
                model: User,
                attributes:['name']
            }],
            where:
            {
           status:"archiver"
            }
              
          });
      
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
},
getAllEvents: async (req, res) => {
  try {
    let response;
    
        response = await Formation.findOne({
            attributes:['title','offre','categorie','createdAt'],
            include:[{
              model: User,
              attributes:['name']
          }],});
    
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}
  
},
updateEvent:async(req,res)=>{
  try {
    const uuid = req.params.uuid;
    const evenement = await Evenement.findOne({
        where:{
            UUiid: uuid
        }
    });
    if(!evenement) return res.status(404).json({msg: "n'existe pas "});
    const { title, details, datedeb, datefin, nbTicket, price, typeEvent, affiche, ref } = req.body; 
        await Evenement.update({
          title, details, datedeb, datefin, nbTicket, price, typeEvent, affiche, ref,free
         },{
            where:{
               UUid:uuid
            }
        });
    
    res.status(200).json({msg: "mise à jour fait avec succes "});
} catch (error) {
    res.status(500).json({msg: error.message});
}
}
}
module.exports = evenementController