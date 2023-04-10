const express = require("express");
const router = express.Router();
const UserCtrl = require("../Controllers/Userctrl");
const User= require("../models/UserModel");
const RefreshToken=require('../Controllers/RefreshToken')

router.get("/token",RefreshToken.refreshToken)
router.post ("/registrer",UserCtrl.register);
router.post ("/login",UserCtrl.login)
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
router.get("/activationpage/:activationCode",function(req, res) {
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
router.get("/getuser", UserCtrl.getUser);
router.post("/devenirInstructeur",UserCtrl.devenirInstructeur)
router.get("/getcandidatFormateur",UserCtrl.getCandidatFormateur)
router.patch("/accepterFormateur",UserCtrl.AcceptFormateur)
router.post("/ajouterinstructeur",UserCtrl.AjouterInstructeur)
router.get("/getinstructeur",UserCtrl.getInstructeur)
router.patch("/bloquer",UserCtrl.bloquerInstructeur)
router.patch("debloquer",UserCtrl.debloquerInstructeur)
router.delete("/supprimerFormateur",UserCtrl.deleteformateur)
router.post("/ajouteradmin",UserCtrl.addAdmin)
router.get("/getadmin",UserCtrl.getAdmin)
router.patch("/bloquerAdmin",UserCtrl.BloquerAdmin)
router.patch("/deblouserAdmin",UserCtrl.DebloquerAdmin)
router.delete("/supprimerAdmin",UserCtrl.deleteadmin)
router.post("/addapprenant",UserCtrl.AddApprenant)
router.get("/gatapprenant",UserCtrl.getApprenant)
router.patch("/supprimerapprenant",UserCtrl.deleteApprenant)
router.post('/getmail',UserCtrl.forgetpass);
router.patch("/update",UserCtrl.resetpass);
router.get("/updateuser",UserCtrl.updateUser)
router.patch("/modifierrole",UserCtrl.updateRole);







module.exports = router;