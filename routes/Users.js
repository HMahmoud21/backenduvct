const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Sequelize =require('sequelize')
const adminController = require('../Controllers/adminController')
const User = require("../models/User");
const verifyUser=require("../middleware/verifyUser");
const admin = require ("../middleware/admin");
const userController = require('../Controllers/userController')
const RefreshToken=require('../Controllers/RefreshToken')
const Users=require("../models/User")

const multer = require("multer");
//requete f postman users

router.post("/register", userController.register );

router.post("/login", userController.login,verifyUser);
router.get("/token",RefreshToken.refreshToken)

router.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
router.post('/getmail',userController.forgetpass,verifyUser);
router.patch("/update",userController.resetpass,verifyUser);

router.get("/activationpage/:activationCode", verifyUser,function(req, res) {
  const code=String(req.params.activationCode);console.log(code)
  User.findOne({
   activationCode : code
      
    
  }).then((user)=>{console.log(user)
    if (!user ) {console.log("bbb")
    return res.send({
      message: "le code d'activation semble étre faux !",
    });
   } else if (user && user.isVerified === true) {console.log("bbb")
        return res.send({
          message: "Votre compte est déja activé !",
        });
      } else if (user && user.isVerified === false){console.log("cc"),User.update({ isVerified: true }, {
        where: {
          isVerified: false
        }
      });
          return res.send({
            message: " Votre compte est activé avec succées !",
          
        });
      }else {return res.send({
        message: " verification echouée",
      
    });}
    })
   
;});
router.get("/getuser",userController.getUser,admin);
router.delete("/delete",userController.deleteUser,admin);
//: routes admin 
router.get("/getadmin",adminController.getAdmin);
router.post("/addadmin",adminController.registeradmin)
router.delete("/deleteadmin",adminController.deleteadmin)
router.post("/saveuser",userController.saveUser)
router.post("/update",userController.updateImage)



// img storage confing
var imgconfig = multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,"./uploads");
  },
  filename:(req,file,callback)=>{
      callback(null,`image-${Date.now()}.${file.originalname}`)
  }
});


// img filter
const isImage = (req,file,callback)=>{
  if(file.mimetype.startsWith("image")){
      callback(null,true)
  }else{
      callback(null,Error("only image is allowd"))
  }
}

var upload = multer({
  storage:imgconfig,
  fileFilter:isImage
})


// register userdata
router.post("/images ",upload.single("photo"), async (req,res)=>{

  const {filename} = req.file;

  if(!filename){
      res.status(422).json({status:422,message:"fill all the details"})
  }
  try {
    await Users.create(
      {
        image:filename
         });
    res.status(201).json({msg: "user Created Successfully"});
  } catch (error) {
    console.log(error.message);
  }

   
});


module.exports = router;