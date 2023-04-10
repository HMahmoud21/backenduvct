const Admin=require("../models/UserModel")

const adminOnly= async (req, res, next) =>{
  const user = await Admin.findOne({
      where: {
          uuid: req.userId
      }
  });
  if(!user) return res.status(404).json({msg: "n'existe pas "});
  if(user.role !== "admin") return res.status(403).json({msg: "accées réfusé "});
  next();
}
module.exports=adminOnly



