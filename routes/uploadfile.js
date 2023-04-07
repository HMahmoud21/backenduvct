const express = require("express");
const router = express.Router();
const multer = require("multer");
const User=require("../models/User")

// img storage confing
var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${file.originalname}`)
    }
  });
  
  


  
  var upload = multer({
    storage:imgconfig,
   
  })
  
  
  router.post("/images", upload.single("photo"), async (req,res)=>{
  
    const {filename} = req.file;
  
    if(!filename){
        res.status(422).json({status:422,message:"fill all the details"})
    }
    try {
      await User.create(
        {
          image:filename
           });
      res.status(201).json({msg: "user Created Successfully"});
    } catch (error) {
      console.log(error.message);
    }
  
     
  });
  
  
  module.exports = router;