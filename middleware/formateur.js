const Formateur=require("../models/Instructeur");

const  formateur = async (req, res, next) =>{
    if(req.Formateur.role!="instructeur"){
        return res.status(401).json({err:'acces refuseé'});
      
    }
  next();
}
module.exports=formateur;