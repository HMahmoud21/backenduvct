const User = require("../models/UserModel");
const Reclamation=require("../models/reclamation")

const ReclamationController={
    addreclamation: async(req,res)=>{
        const {sujet,typeCompte} = req.body;
        const uuid=req.params.uuid
        try{
            const reclamation = await Reclamation.findOne({ where: {  sujet:sujet,typeCompte:typeCompte,userId:uuid
                } });
            if (reclamation) {
              return res.status(409).json({ msg: "deja envoyé " }); 
            }
        
        const newReclamtion = await Reclamation.create({
        sujet:sujet,
        typeCompte:typeCompte,
          userId:uuid
          });
    
          res.status(201).json({ msg: "reclamation envoyé avec succées ",reclamation: newReclamtion });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Une erreur est survenue l" });
        }
    



    },
    getallreclamation:async(req,res)=>{
        try {
            let response;
            
                response = await Reclamation.findAll({
                    attributes:['sujet','typeCompte','createdAt'],
                    include:[{
                      model: User,
                      attributes:['name']
                  }]
                    
                });
            
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }


    },
    deletereclamation:async(req,res)=>{
        try {
            const uuid=req.params.uuid
            const reclamation = await Reclamation.findOne({
                where:{
                    uuid:uuid
                }
            });
            if(!reclamation) return res.status(404).json({msg: "reclamation  n'existe pas "});
             
           
                await Reclamation.destroy({
                    where:{
                        uuid:uuid
                    }
                });
                res.status(200).json({msg: " reclamation supprimé "});
              } catch (error) {
                  res.status(500).json({msg: error.message});
              }

    },
    getreclamationById:async(req,res)=>{
        try {
            const uuid=req.params.uuid
            const reclamation = await Reclamation.findOne({
                where:{
                    uuid:uuid
                }
            });
            if(!reclamation) return res.status(404).json({msg: "reclamation  n'existe pas "});
            let response;
            
                response = await Reclamation.findOne({
                    attributes:['sujet','typeCompte','createdAt'],
                    include:[{
                      model: User,
                      attributes:['name']
                  }],
                  where:{
                    uuid:uuid
                  }
                    
                });
            
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }


    },
//repondre sur une reclamation?????




//chaque user peut avoir ses reclamation 
getmyrecalation: async(req,res)=>{
    const uuid=req.params.uuid 
    const user =await User.findOne({ where: { uuid :uuid } });
    if(!user) {
        return res.status(409).json({ msg: "user n'existe pas " }); 

       }
      let response;
      response = await Reclamation.findAll({
        attributes:['sujet','typeCompte','createdAt'],
        where:{
            userId:uuid
        }

    });
            

    
}
}
module.exports=ReclamationController