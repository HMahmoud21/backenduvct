const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User= require("../models/UserModel");
const nodemailer = require('nodemailer');
const path = require("path");
const fs=require("fs");

const UserCtrl={
register: async (req, res) => {
        const characters =
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomCode = "";
        for (let i = 0; i < 25; i++) {
          randomCode += characters[Math.floor(Math.random() * characters.length)];
        }
        const today = new Date();
        const userData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          activationCode: randomCode,
          created: today,
        };
        User.findOne({
          where: {
            email: req.body.email,
          },
        })
          //TODO bcrypt
          .then((user) => {
            if (!user) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                
                User.create(userData)
                  .then(function (user) {
                   /* const token =  jwt.sign({ id: user.dataValues.uuid}, process.env.SECRET_KEY, {
                      expiresIn: 14400,
                    });
                    const refreshtoken =  jwt.sign({ id: user.dataValues.uuid }, process.env.SECRET_KEY, {
                      expiresIn: 14400,
                    });
                    userData.refreshtoken = refreshtoken;
                    userData.token = token;*/
                  // const refreshtoken = createRefreshToken({ email });
                 
            
                  
                    res
                      .send({
                        message: "user created successfully...check your inbox",
                      });
    
                    //EmailSender({email})
                    // res.json({ msg: "Your message sent successfully" });
                    var transport = nodemailer.createTransport({
                      /*host: 'smtp.gmail.com',
                     port: 465,
                    secure: true,*/
                      service: "Gmail",
                      auth: {
                        user: "gytgutu@gmail.com",
                        pass: "qfpxgkaetihdmxzl",
                      },
                    });
                    var mailOptions = {
                      from: "UVCT-Training",
                      to: req.body.email,
                      subject: "activer votre compte",
                      html: `
                     <div>
                      <h1>Email d'activation du compte </h1>
                        <h2>Bonjour </h2>
                      <p>Veuillez confirmer votre email en cliquant sur le lien suivant
                      <a href=http://localhost:3000/activationpage/${userData.activationCode}>Cliquez ici</a>                              
                       </div>`,
                    };
                    transport.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Mail sent successfully:-", info.response);
                      }
                    });
                  })
                  .catch((err) => {
                    res.send("error: " + err);
                  });
              });
            } else {
              res.send({ message: "User already exist" });
            }
          })
          .catch((err) => {
            res.send("error: " + err);
          });
    },
login: async (req, res) => {
        const {  password } = req.body;
       
        try {
          const user = await User.findOne({
              where:{
                  email: req.body.email,
              },
          });
        
          const match = await bcrypt.compareSync(password, user.password);
          if(!match) return res.json({message: "mot de passe incorrect"});
          if (user && user.isVerified === true) {
            
         
          //const userId = user.dataValues.uuid;console.log(userId)
          const name = user.name;console.log(name)
          const email = user.email;console.log(email)
          const accessToken = jwt.sign({ name, email,role }, process.env.ACCESS_TOKEN_SECRET,{
              expiresIn: '20s'
          });
          
          const refreshToken = jwt.sign({ name, email}, process.env.REFRESH_TOKEN_SECRET,{
              expiresIn: '1d'
          });console.log(refreshToken)
          await User.update({refresh_token: refreshToken},{
              where:{
                email: email
              }
          });
           
          res.cookie('refreshToken', refreshToken,{
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000
          });
          res.json({ message: "login avec success", accessToken: accessToken , refreshToken:refreshToken,user:user });
        
        } else {
          res.json({ message: "verifiez votre compte" });
          console.log("bbb");
        }
      } catch (error) {
          res.json({message:"User does not exist"});
      }
    },
getUserBId : async(req, res) =>{
        try {
           const uuid = req.params.uuid;
            const response = await User.findAll({
                attributes:['name','email','role','uuid'],
                where: {
                    UUid:uuid
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
devenirInstructeur:async(req,res)=>{
  
    const today = new Date();
    const userData = {
      name: req.body.name,
      email: req.body.email,
      tel: req.body.tel,
      
      //cv: req.file.filename,
      message:req.body.message,
      speciality:req.body.speciality,
      created: today,
      role:"instruceur",
      status:"bloqué",
      etat:"en attent",
    };
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
        if (!user) {
          User.create(userData).then(function (user) {
            res.status(200).send({message:"votre demande est bien envoyé" }) 
                
              })  
              .catch((err) => {
                res.send("error: " + err);
              });
        } else {
          res.status(409).send({ message: "demande deja envoyée" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      }); 
    },
getCandidatFormateur : async (req, res) =>{
        try {
            let response;
            
                response = await User.findAll({
                    attributes:['UUid','name','email','tel','etat'],
                    where:{
                        etat:"en attent"
                }
                    
                });
            
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
AcceptFormateur:async(req,res)=>{
        
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user) return res.status(404).json({msg: "demande n'existe pas "});
        try {
            await User.update({
                statut:"active",
                etat:"accepté"
            },{
                where:{
                    email: req.body.email
                }
            });
            res.status(200).json({msg: "formateur accepter"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
    },
AjouterInstructeur:async(req,res)=>{
      const {name, email, speciality, password, tel}=req.body
      try{
    const user = await User.findOne({
      where: {
          email: req.body.email
      }
  });
  if(user) return res.status(404).json({msg: "existe deja"});
  const newInstructeur= await User.create({
   name:name,
   email:email,
   password:password,
   speciality:speciality,
   tel:tel,
   role:"instructeur",
   statut:"active",
   etat:"accepter"


  });

res.status(201).json({ msg: "Instructeur bien ajouté", newInstructeur });
} catch (error) {
console.error(error);
res.status(500).json({ msg: "Une erreur est survenue " });
}

   }, 
getInstructeur:async(req,res)=>{
    
      try {
        let response;
        
            response = await User.findAll({
                attributes:['UUid','name','email','tel','etat'],
                where:{
                    etat:"accepter",
                    statut:"active"
            }
                
            });
        
        res.status(200).json(response);
    } 
    catch (error) {
        res.status(500).json({msg: error.message});
    }
   },
bloquerInstructeur:async(req,res)=>{
    const user = await User.findOne({
      where: {
          email: req.body.email
      }
  });
  if(!user) return res.status(404).json({msg: "Instructeur n'existe pas "});
  try {
      await User.update({
          statut:"bloquer",
          
         
      },{
          where:{
            email:req.body.email,
            statut:"active" ,
            role:"instructeur"

          }
      });
      res.status(200).json({msg: "formateur bloquer"});
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
   },
debloquerInstructeur:async(req,res)=>{
    const user = await User.findOne({
      where: {
          email: req.body.email
      }
  });
  if(!user) return res.status(404).json({msg: "Instructeur n'existe pas "});
  try {
      await User.update({
          statut:"activer",
          
         
      },{
          where:{
            email:req.body.email,
            statut:"bloquer" 

          }
      });
      res.status(200).json({msg: "formateur débloquer"});
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
   }, 
deleteformateur : async(req, res) =>{
  const uuid=req.params.uuid
 
    const formateur = await User.findOne({
    where: {
      uuid:uuid
    }
});
if(!formateur) return res.status(404).json({msg: "formateur n'existe pas "});

try {
    await User.destroy({
        where:{
          uuid:uuid
       
        }
    });
    res.status(200).json({msg: "Formateur Deleted"});
} catch (error) {
    res.status(400).json({msg: error.message});
}
  },
addAdmin:async(req,res)=>{
    
    const today = new Date();
    const adminData = {
      name: req.body.name,
      genre:req.body.genre, 
      email: req.body.email,
      password: req.body.password,
      tel:req.body.tel,
      statut:"activer",
      etat:"accepter",
      role:"admin",
      created: today,
    };
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      //TODO bcrypt
      .then((admin) => {
        if (!admin) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            adminData.password = hash;
            User.create(adminData).then(function (user) {
                res.status(200).send({message:"admin created successfully"}) 
              })  
              .catch((err) => {
                res.send("error: " + err);
              });
          });
        } else {
          res.status(409).send({ message: "admin already exist" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
getAdmin: async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['name','email','genre','tel',"role"],
            where:{
              role:"admin",
              statut:"activer"

            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
},
BloquerAdmin:async(req,res)=>{
  const user = await User.findOne({
    where: {
        email: req.body.email
    }
});
if(!user) return res.status(404).json({msg: "Instructeur n'existe pas "});
try {
    await User.update({
        statut:"bloquer",
        
       
    },{
        where:{
          email:req.body.email,
          statut:"active" ,
          role:"admin",

        }
    });
    res.status(200).json({msg: "formateur bloquer"});
} catch (error) {
    res.status(400).json({msg: error.message});
}
},
DebloquerAdmin:async(req,res)=>{
  const user = await User.findOne({
    where: {
        email: req.body.email
    }
});
if(!user) return res.status(404).json({msg: "admin n'existe pas "});
try {
    await User.update({
        statut:"activer",
        
       
    },{
        where:{
          email:req.body.email,
          statut:"bloquer" 

        }
    });
    res.status(200).json({msg: "formateur débloquer"});
} catch (error) {
    res.status(400).json({msg: error.message});
}

},
deleteadmin :async(req, res) =>{
    const admin = await User.findOne({
        where: {
          //uuid: req.body.uuid
          email:req.body.email
        }
    });
    if(!admin) return res.status(404).json({msg: "admin n'existe pas"});
    try {
        await User.destroy({
            where:{
              email:req.body.email
              
        }});
        res.status(200).json({msg: "admin supprimer"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
},
AddApprenant:async(req,res)=>{

  const today = new Date();
  const userData = {
    name: req.body.name,
    tel:req.body.tel,
    email: req.body.email,
    password: req.body.password,
    role:"apprenant",
    statut:"activer",
    etat:"accepter",
    created: today,
    
  };
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    //TODO bcrypt
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData).then(function (user) {
              res.status(200).send({message:"apprenant created successfully"}) 
              
  
            })  
            .catch((err) => {
              res.send("error: " + err);
            });
            
         
        });
      } else {
        res.status(409).send({ message: "apprenant already exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
},
getApprenant:async(req,res)=>{
  try {
    let response;
    
        response = await User.findAll({
            attributes:['UUid','name','email','tel','role'],
            where:{
               
                role:"apprenant"
        }
            
        });
    
    res.status(200).json(response);
} 
catch (error) {
    res.status(500).json({msg: error.message});
}

},
deleteApprenant:async(req, res) =>{
const apprenant = await User.findOne({
  where: {
      email: req.body.email
  }
});
if(!apprenant) return res.status(404).json({msg: "apprennat not found"});
try {
  await User.destroy({
      where:{
          email: req.body.email
      }
  });
  res.status(200).json({msg: "apprenant Deleted"});
} catch (error) {
  res.status(400).json({msg: error.message});
}
},
forgetpass:async(req, res) =>{
  
  User.findOne({
     where: {
         email:req.body.email
     }
 })
 .then((user) => {console.log(user);
          var transport = nodemailer.createTransport({
           service: 'Gmail',
           auth: {
           user: 'gytgutu@gmail.com',
             pass: 'htypomzgmahmntfo',
           },
          });
          var mailOptions = {
          from: 'UVCT-Training',
          to: req.body.email,
           subject: 'password oublie??',
           html: `
            <div>
             <h1>Email de verification  </h1>
               <h2>Bonjour </h2>
             <p>Veuillez confirmer votre email en cliquant sur le lien suivant
             <a href=http://localhost:3000/Formmdpoublie>Cliquez ici</a>                              
              </div>`,

               };
             transport.sendMail(mailOptions, function (error, info) {
               if (error) {
                  console.log(error);
                   } else {
               console.log('Mail sent successfully:-', info.response);
                }
                });
         }) 
         .catch((err) => {
           res.send("error: " + err);
         });
         
      
    
},
resetpass:async(req,res)=>{
  const {password, confPassword, email} = req.body;
    let hashPassword;
    hashPassword = await bcrypt.hash(password);
    
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirmation Password does not match"});
    try {
        await User.update({
            
           password: hashPassword,
           
            where:{
                email: email
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
},
getUserbyId: async (req, res) =>{
  const uuid = req.params.uuid;
  const user = await User.findOne({
      attributes:['uuid','name','email','role'],
      where: {
        UUid: uuid
      }
  });
  if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
  res.status(200).json(user);
},
updateUser : async(req, res) =>{
  const user = await User.findOne({
      where: {
          email:req.body.email
      }
  });
  if(!user) return res.status(404).json({msg: "user n'existe pas "});
  const {name, email, password, confPassword} = req.body;
  let hashPassword;
  if(password === "" || password === null){
      hashPassword = user.password
  }else{
      hashPassword = await bcrypt.hash(password);
  }
  if(password !== confPassword) return res.status(400).json({msg: "Password et Confirm Password different"});
  try {
      await User.update({
          name: name,
          email: email,
          password: hashPassword,
          
      },{
          where:{
              id: user.id
          }
      });
      res.status(200).json({msg: "User Updated"});
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
},
updateRole:async(req,res)=>{
  const user = await User.findOne({
    where: {
        email: req.body.email
    }
});
if(!user) return res.status(404).json({msg: "user n'existe pas "});

try {
    await User.update({
      role:req.body.role
        
       
    }
    );
    res.status(200).json({msg: "role modifie  bloquer"});
} catch (error) {
    res.status(400).json({msg: error.message});
}

},
Logout :async(req, res) => {
 
  const uuid = req.params.uuid;
  const user = await User.findAll({
      where:{
        UUid: uuid
      }
  });
  if(!user) return res.sendStatus(204);
 
  await User.update({refresh_token: null},{
      where:{
        UUid: uuid
      }
  });
  res.clearCookie('refreshToken');
  
  return res.sendStatus(200);
}, 

updateimage:async(req,res)=>{
  const uuid=req.params.uuid
 
  if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
  const name = req.body.title;
  const file = req.files.file;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.png','.jpg','.jpeg'];

  if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});


  file.mv(`./public/images/${fileName}`, async(err)=>{
      if(err) return res.status(500).json({msg: err.message});
      try {
            await User.update({
              name: name, image: fileName, url: url
              
          },{
              where:{
                UUid: uuid
              }
          });
        
          res.status(201).json({msg: "image bien ajouté "});
      } catch (error) {
          console.log(error.message);
      }
  })
},
ajouter:async(req,res)=>{
const today = new Date();
 
  if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
  const name1= req.body.name;
  const file = req.files.file;
  const email= req.body.email;
  const tel= req.body.tel;

  const message=req.body.message;
  const speciality=req.body.speciality;
  const created= today;
  const role="instruceur";
  const status="bloqué";
  const etat="en attent";
  const ext = path.extname(file.name).toLowerCase;
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.pdf'];

  if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});


  file.mv(`./public/images/${fileName}`, async(err)=>{
      if(err) return res.status(500).json({msg: err.message});
      try {
            await User.create({
              name:name1,
              cv: fileName,
              url: url,
              email:email,
              tel:tel,
              message:message,
              speciality:speciality,
              role:role,
              status:status, 
          },{
              where:{
                UUid: uuid
              }
          });
          res.status(201).json({msg: " "});
      } catch (error) {
          console.log(error.message);
      }
  })
},
ajouter202: async(req, res) => {
  const today = new Date();
  //const uuid=req.params.uuid

  if (req.files === null) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }
  
  const name = req.body.title
  const file = req.files.file;
  const email = req.body.email;
  const tel = req.body.tel;
  const message = req.body.message;
  const speciality = req.body.speciality;
  const created = today;
  const role = "instructeur";
  const status = "bloqué";
  const etat = "en attente";
  
  try {
   /* if (!req.body.email) {
      return res.status(400).json({ msg: "Email is missing" });
    }
    
    const user = await User.findOne({
      where: {
        email : req.body.email
      },
    });
  
    if (user) {
      return res.status(404).json({ msg: "La demande existe déjà" });
    }*/
  
    const ext = path.extname(file.name).toLowerCase();
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".pdf"];
  
    if (!allowedType.includes(ext)) {
      return res.status(422).json({ msg: "Invalid File Type" });
    }
  
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
  
      try {
        const newUser = {
          name:name,
          cv: fileName,
          url: url,
          email: email,
          tel: tel,
          message: message,
          speciality: speciality,
          role: role,
          status: status,
          etat: etat,
          created: created,
        };
  
        await User.create(newUser);
  
        res.status(201).json({ msg: "User created successfully" });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
}
}




module.exports=UserCtrl