const Achat = require("../models/achat")
const Formation = require("../models/formation")
const User =require("../models/UserModel")


const AchatController={
    addAchat:async(req,res)=>{
        const uuid =req.params.uuid
        const id =req.params.id

        try{
            
        
        const newachat= await Achat.create({
            acheterpar:uuid,
            formationId:id,

          });
    
          res.status(201).json({ msg: "votre achat est faite avec succes ", newachat});
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Une erreur est survenue lors de l'achat " });
        }
    


    },
    // avoir les utilisateur qui  faire un achat 
    getAchat:async(req,res)=>{
        let response 
        try{
        response = await Achat.findAll({
            attributes:['createdAt'],
            include:[{
              model:User ,
              attributes:['name'],
          }],
            
        });
    
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}

},
// voir les formation achtéé

getAchatfor:async(req,res)=>{
    let response 
    try{
    response = await Achat.findAll({
        attributes:['createdAt'],
        include:[{
          model:Formation ,
          attributes:['title'], 
      }],


        
    });

res.status(200).json(response);
} catch (error) {
res.status(500).json({msg: error.message});
}

},

// voir les formation acheter par chaque user

getAchatpar:async(req,res)=>{
    let response 
    const uuid =req.params.uuid // id de formation 
    try{
    response = await Achat.findAll({
        attributes:['createdAt'],
        include:[{
          model:User ,
          attributes:['name'],
      }],
      where:{
        formationId:uuid
      }
        
    });

res.status(200).json(response);
} catch (error) {
res.status(500).json({msg: error.message});
}

},
getAllAchat:async(req,res)=>{
    let response 
 
    try{
    response = await Achat.findAll({
        attributes:['createdAt'],
        attributes: ['createdAt'],
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
res.status(500).json({msg: error.message});
}
},

//mes achat (liste des formation acheter par un utilisateur )
MesAchat: async(req,res)=>{
  const uuid=req.params.uuid
  let response
  try{
    response = await Achat.findAll({
      attributes:['createdAt'],
      include:[{
        model:Formation ,
        attributes:['title'],
    }],
    where:{
      acheterpar:uuid
    }
      
  });

res.status(200).json(response);
} catch (error) {
res.status(500).json({msg: error.message});
}
},

// liste des formation favoris 
Mesfavoris:async(req,res)=>{

  const uuid=req.params.uuid // id de l'utilisateur  déja connecté 
  let response
  try{
    response = await Achat.findAll({
      attributes:['createdAt'],
      include:[{
        model:Formation ,
        attributes:['title','categorie','createdAt'],
    }],
    where:{
      acheterpar:uuid,
      favoris:"favoris "
    }
      
  });

res.status(200).json(response);
} catch (error) {
res.status(500).json({msg: error.message});
}

},
// ajouter une formation a la liste des favoris 

favoris:async(req,res)=>{
  const uuid=req.params.uuid 
  console.log(uuid) // id d'un achat déja effectué 
  const achat= await Achat.findOne({
    where:{
        uuid: uuid
    }
});
if(!achat) return res.status(404).json({msg: "n'existe pas "});

try{
    await Achat.update({favoris:"favoris"},{
        where:{
           uuid:uuid
        }
    });
res.status(200).json({msg: "formation bien ajouté au favoris "});
} catch (error) {
res.status(500).json({msg: error.message});
}
},
// écraser une formation de la liste des favoris 
normal:async(req,res)=>{
  const uuid=req.params.uuid 
  console.log(uuid) // id d'un avhat déja effectué 
  const achat= await Achat.findOne({
    where:{
        uuid: uuid
    }
});
if(!achat) return res.status(404).json({msg: "n'existe pas "});

try{
    await Achat.update({favoris:"normal"},{
        where:{
           uuid:uuid
        }
    });
res.status(200).json({msg: "formation bien supprimé de la liste des favoris  "});
} catch (error) {
res.status(500).json({msg: error.message});
}
},



}






module.exports=AchatController