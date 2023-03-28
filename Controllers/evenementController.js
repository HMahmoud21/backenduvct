const Instructeur = require("../models/Instructeur");
const Admin=require("../models/Admin")
const Evenement=require("../models/evenement");
const {Op} =require("sequelize");


const evenementController = {
createEvenement: async (req, res) => {
        const { title, details, datedeb, datefin, nbTicket, price, typeEvent, affiche, instructeurUUid, adminId, ref } = req.body; 
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
            instructeurId: instructeurUUid,
            adminId: adminId
          });
      
          res.status(201).json({ msg: "Evenement créé avec succès", evenement: newEvenement });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Une erreur est survenue lors de la création de l'evenement" });
        }
      },
getEvenemetinstr :async (req, res) =>{
        try {
          let response;
          
              response = await Evenement.findAll({
                  attributes:['title','details',' datedeb','datefin', 'affiche'],
                  include:[{
                    model: Instructeur,
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
                    model: Admin,
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
            const evenement = await Evenement.findOne({
                where:{
                    ref: req.body.ref
                }
            });
            if(!evenement) return res.status(404).json({msg: "evenement n'existe pas "});
             const numero=req.body.numero
           
                await Evenement.destroy({
                    where:{
                     ref:ref
                    }
                });
                res.status(200).json({msg: "Evenemt supprimé "});
              } catch (error) {
                  res.status(500).json({msg: error.message});
              }
            },

    }
module.exports = evenementController