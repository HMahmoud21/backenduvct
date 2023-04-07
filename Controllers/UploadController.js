const cloudinary = require('cloudinary')
const fs = require('fs')
const multer=require ("multer");



// Configuration 
cloudinary.config({
  cloud_name: "dcxqztxw9",
  api_key: "281578345618125",
  api_secret: "Kmg4u273WUtTSfk0PJ_kNagQcaA"
});
const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

res.then((data) => {
  console.log(data);
  console.log(data.secure_url);
}).catch((err) => {
  console.log(err);
});


// Generate 
const url = cloudinary.url("olympic_flag", {
  width: 100,
  height: 150,
  Crop: 'fill'
});



// The output url
console.log(url);

const  uploadController= {
    uploadAvatar: (req, res) => {
       
        try { 
            if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file provided' });
          }
          
      
          const file = req.files.file;
          console.log('file:', file);
      
          cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: '', width: 150, height: 150, crop: "fill"
          }, async (err, result) => {
            if (err) {
              throw err;
            }
      
            removeTmp(file.tempFilePath);
      
            res.json({ url: result.secure_url });
          });
        } catch (err) {
          console.error(err);
          res.status(400).send({ error: err.message });
        }
      }
      
      
      


};





module.exports=  uploadController