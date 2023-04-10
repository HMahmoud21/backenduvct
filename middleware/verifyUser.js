const User=require("../models/UserModel");


const verifyUser = async (req, res, next) =>{
  
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "n'existe pas "});
    req.userId = user.id;
    req.role = user.role; 
    next();
}
module.exports= verifyUser