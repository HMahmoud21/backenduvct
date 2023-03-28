const User=require("../models/User");

/*const  user= async (req, res, next) =>{
    if(req.User.role!=2){
        return res.status(401).json({err:'acces refuseé'});
      
    }
  next();
}
module.exports= user;*/
// fonction pour définir si le user est connecté : 

const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}
module.exports= verifyUser