const userModel=require("../models/UserModel");

const  formateur = async (req, res, next) =>{

   const user = await User.findOne({
      where: {
          uuid: req.userId
      }
  });
  if(!user) return res.status(404).json({msg: "n'existe pas "});
  if(user.role !== "instructeur") return res.status(403).json({msg: "accées réfusé "});
  next();
}
module.exports=formateur;