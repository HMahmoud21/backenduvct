const Formation= require("../models/formation");
const User = require("../models/UserModel");
 


const FormationController={
CreateFormation:async(req,res )=>{

    const { title, subTitle,categorie, status, price, ref,offre,level,description,objectif,prerequis} = req.body;
     
    try{
        const formation = await Formation.findOne({ where: { ref:ref } });
        if (formation) {
          return res.status(409).json({ msg: "La formation existe déjà" }); 
        }
    
    const newFormation = await Formation.create({
        title: title,
        subTitle:subTitle,
        level:level,
        description:description,
        objectif:objectif,
        categorie: categorie,
        status: status,
        price: price,
        prerequis:prerequis,
       ref:ref,
        offre:offre,
        postedBy: req.params.id,
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
                model: User,
                attributes:['name']
            }],
            where:{
              status: "pulier"

            }
              
          });
      
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
},
getFormationsByTitle :async (req, res) =>{
   
  const title = req.params.title;
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
                title:title
              }
                
            });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}, 
getFormationsById:async (req, res) =>{
   
  const uuid= req.params.uuid;
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
                   UUid:uuid
              }
                
            });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}, 
publier:async(req,res)=>{
    try {
      const uuid = req.params.uuid;
      if (!uuid) return res.status(400).json({msg: "UUID manquant."});
  
      const product = await Formation.findOne({
        where: {
          UUid: uuid
        }
      });
      if (!product) return res.status(404).json({msg: "La formation n'existe pas."});
  
      await Formation.update(
        { 
          status: "pulier"
        },
        {
          where: {
            UUid: uuid
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
        const uuid = req.params.uuid;
        if (!uuid) return res.status(400).json({msg: "UUID manquant."});
    
        const product = await Formation.findOne({
          where: {
            UUid: uuid
          }
        });
        if (!product) return res.status(404).json({msg: "La formation n'existe pas."});
    
        await Formation.update(
          { 
            status: "depulier"
          },
          {
            where: {
              UUid: uuid
            }
          }
        );
    
        res.status(201).json({ msg: "La formation a été publiée avec succès." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    },
  
  

archiver:async(req,res)=>{
    try {
        const uuid = req.params.uuid;
        if (!uuid) return res.status(400).json({msg: "UUID manquant."});
    
        const product = await Formation.findOne({
          where: {
            UUid: uuid
          }
        });
        if (!product) return res.status(404).json({msg: "La formation n'existe pas."});
    
        await Formation.update(
          { 
            status: "archiver"
          },
          {
            where: {
              UUid: uuid
            }
          }
        );
    
        res.status(201).json({ msg: "La formation a été publiée avec succès." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    },
getFormationarchive:async(req,res)=>{
  try {
    let response;
    
        response = await Formation.findAll({
            attributes:['title','offre','categorie','createdAt'],
            include:[{
              model: User,
              attributes:['name']
          }],
          where:{ 
            status:archiver

          }
            
        });
    
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}

},
deleteFormation:async(req, res) =>{
  const uuid=req.params.uuid
    try {
        const product = await Formation.findOne({
            where:{
              uuid:uuid
              
            }
        });
        if(!product) return res.status(404).json({msg: "formation n'existe pas "});
       
       
            await Formation.destroy({
                where:{
               uuid:uuid
                }
            });
            res.status(200).json({msg: "formation supprimé "});
          } catch (error) {
              res.status(500).json({msg: error.message});
          }
},
updateFormation:async(req,res)=>{
  try {
    const uuid = req.params.uuid;
    const evenement = await Formation.findOne({
        where:{
            UUiid: uuid
        }
    });
    if(!evenement) return res.status(404).json({msg: "n'existe pas "});
    const { title, subTitle,categorie, status, price, ref,offre,level,description,objectif,prerequis} = req.body;
     
        await Formation.update({
          title, subTitle,categorie, status, price, ref,offre,level,description,objectif,prerequis
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
module.exports= FormationController