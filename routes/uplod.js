
//const uploadController=require("../Controllers/UploadController");
const express = require("express");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const router = express.Router();
const multer = require('multer');
const fileUpload = multer({ dest: 'uploads/' });


router.post('/upload', fileUpload.single('image'), async function (req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file provided" });
        }
    
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
    
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        const result = await streamUpload(req);
        console.log(result);
    
        res.status(200).json({ message: "File uploaded successfully", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
module.exports = router;