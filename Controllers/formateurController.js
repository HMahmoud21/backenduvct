
const Formateur=require('../models/formateur');
//const upload = multer({ dest: 'uploads/' }); // indiquez le dossier de destination pour les fichiers téléchargés

const FormateurController = {
createFormateur : async(req, res) =>{
    const today = new Date();
    const userData = {
      name: req.body.name,
      email: req.body.email,
      tel: req.body.tel,
      cv: req.file.filename,
      message:req.body.message,
      created: today,
    };
    Formateur.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
        if (!user) {
          
            Formateur.create(userData).then(function (user) {
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
getFormateur : async (req, res) =>{
      try {
          let response;
          
              response = await Formateur.findAll({
                  attributes:['UUid','name','email','tel'],
                  
              });
          
          res.status(200).json(response);
      } catch (error) {
          res.status(500).json({msg: error.message});
      }
  },
deleteformateur : async(req, res) =>{
 
    const formateur = await Formateur.findOne({
    where: {
        email:req.body.email
    }
});
if(!formateur) return res.status(404).json({msg: "formateur not found"});
if(req.role === 4){
try {
    await User.destroy({
        where:{
            id: user.id
        }
    });
    res.status(200).json({msg: "User Deleted"});
} catch (error) {
    res.status(400).json({msg: error.message});
}}
else {

res.status(400).json({msg:"vous n'avez pas l'accés"});

}},


}
module.exports = FormateurController