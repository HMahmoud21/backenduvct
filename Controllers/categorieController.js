const Categorie= require("../models/Categorie")
const Formation=require("../models/formation")
 

const CategorieController={

CreateCategorie:async(req,res)=>{
    const today = new Date();
    
    const { title, description,image,ref} = req.body; 
  
        try {
       
          const categorie = await Categorie.findOne({ where: { title:title } });
          if (categorie) {
            return res.status(409).json({ msg: " existe déjà" }); // Utilisation du code d'état 409 Conflict pour indiquer que la demande ne peut être traitée en raison d'un conflit avec les ressources existantes.
          }
      
          // Créer une nouvelle evenement avec l'ID de l'instructeur et de l'admin associés.
          const newCategorie = await Categorie.create({
            title: title,
            description:description ,
            image: image,
            ref: ref,
            createdAt:today,
        
          });
      
          res.status(201).json({ msg: "categorie créé avec succès", categorie: newCategorie });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Une erreur est survenue lors de la création de coupon" });
        }
      },
getCategories :async (req, res) =>{
        try {
          let response;
          
              response = await Categorie.findAll({
                  attributes:['title','description','createdAt'],
                  include:[{
                    model: Formation,
                    attributes:['title']
                }]
                  
              });
          
          res.status(200).json(response);
      } catch (error) {
          res.status(500).json({msg: error.message});
      }
    
      },
deleteCtegories:async(req, res) =>{
  const uuid= req.params.uuid;
        try {
            const categorie = await Categorie.findOne({
                where:{
                  uuid:uuid
                }
            });
            if(!categorie) return res.status(404).json({msg: "catégorie n'existe pas "});
             const ref=req.body.ref
           
                await Categorie.destroy({
                    where:{
                     ref:ref
                    }
                });
                res.status(200).json({msg: "catégorie supprimé "});
              } catch (error) {
                  res.status(500).json({msg: error.message});
              }
            },


}




 module.exports=CategorieController