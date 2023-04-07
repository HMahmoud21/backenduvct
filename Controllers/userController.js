const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path=require("path");
const fs= require("fs");
const nodemailer = require('nodemailer');
const User = require("../models/User");




const userController = {

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
      activationCode:randomCode,
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
                subject: 'activer votre compte',
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
                    console.log('Mail sent successfully:-', info.response);
                     }
                     });
              }) 
              .catch((err) => {
                res.send("error: " + err);
              });
              
           
          });
        } else {
          res.status(409).send({ message: "User already exist" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
  
login: async (req, res) => {
  try {
    const user = await User.findAll({
        where:{
            email: req.body.email
        }
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '20s'
    });
    const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '1d'
    });
    await User.update({refresh_token: refreshToken},{
        where:{
            id: userId
        }
    });
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
} catch (error) {
    res.status(404).json({msg:"Email tidak ditemukan"});
}
},
     

Logout : async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
},

getUser : async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['name','email','role'],
            where: {
                email: req.body.email
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
},

deleteUser : async(req, res) =>{
    const user = await User.findOne({
        where: {
            email:req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    try {
      const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
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
Userinfo: async (req, res) =>{
  if(!req.session.userId){
      return res.status(401).json({msg: "Veuillez vous connecter à votre compte !"});
  }
  const user = await User.findOne({
      attributes:['uuid','name','email','role'],
      where: {
          uuid: req.session.userId
      }
  });
  if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
  res.status(200).json(user);
},
saveUser: (req, res) => {
  if (req.files === null) return res.status(400).json({msg: "No File Uploaded"});
  const name = req.body.name;
  const file = req.files.file;
  //const fileSize = file.size;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
  //if (fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({msg: err.message});
    try {
      await User.create({email: req.body.email, image: fileName, url: url});
      res.status(201).json({msg: "user Created Successfully"});
    } catch (error) {
      console.log(error.message);
    }
  })
},



updateImage : async(req, res)=>{
  const user = await User.findOne({
      where:{
          email:req.body.email
      }
  });
  if(!user) return res.status(404).json({msg: "No Data Found"});
  
  let fileName = "";
  if(req.files === null){
      fileName =user.image;
  }else{
      const file = req.files.file;
      //const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = ['.png','.jpg','.jpeg'];

      if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
      if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

      const filepath = `./public/images/${user.image}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/images/${fileName}`, (err)=>{
          if(err) return res.status(500).json({msg: err.message});
      });
  }
  
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  
  try {
      await User.update({ image: fileName, url: url},{
          where:{
            email:req.body.email
          }
      });
      res.status(200).json({msg: "user Updated Successfuly"});
  } catch (error) {
      console.log(error.message);
  }
},

}


   


module.exports = userController