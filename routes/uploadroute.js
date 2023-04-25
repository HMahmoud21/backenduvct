/*var  multer = require('multer');
const path=require('path')
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/images')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })
router.patch('/ajoutavatar/:uuid', upload.single('avatar'), function(req, res) {
  const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images'&& User.update({
        
      avatar:'/images/1679971357498.png'
    },{where:{
  
      uuid:req.params.uuid}})
   
  )
 
  filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname));
    console.log(req.file);
    
   
  }
})
var upload = multer({ storage: storage })
  

}







