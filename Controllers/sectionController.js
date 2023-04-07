const Section= require("../models/section")
const Formation=require("../models/formation")

const SectionController={
addsection:async(req,res)=>{ 
    const today = new Date(); 
    const {title,objectif,ref,formationUUid} = req.body
    try {
       
        const section = await Section.findOne({ where: { ref: ref } });
        if (section) {
          return res.status(409).json({ msg: " existe déjà" }); 
        }
        const newSection= await Section.create({
            title: title,
            objectif:objectif,
            ref: ref,
            createdAt:today,
            formationUUid:formationUUid
            //formationId:req.formationId
          });

        res.status(201).json({ msg: "section  créé avec succès",section: newSection });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Une erreur est survenue lors de la création de section" });
    }


    },
getSection:async(req,res)=>{

  try {
    let response;
  
        response = await Section.findAll({
            attributes:['title'],
            include:[{
                model: Formation,
                attributes:['title']
            }]
        });
        res.status(200).json(response);
     }catch (error) {
        res.status(500).json({msg: error.message});
    }

} , 
getsectionByid:async(req,res)=>{
  try {
    const section = await Section.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!section) return res.status(404).json({msg: "section n'existe pas "});
    let response;
    
        response = await Section.findOne({
            attributes:['title'],
            where:{
                id: section.id
            },
            include:[{
                model: Formation,
                attributes:['title']
            }]
        }); res.status(200).json(response);
       }catch (error) {
          res.status(500).json({msg: error.message});
      }

} ,
updateSection:async(req,res)=>{
  try {
    const section = await Section.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!section) return res.status(404).json({msg: "section n'existe pas "});
    const {title,objectif,ref} = req.body
   
        await Product.update({title,objectif,ref} ,{
            where:{
                id: section.id
            }
        });
        res.status(200).json({msg: "section updated successfuly"});
      }catch (error) {
          res.status(500).json({msg: error.message});
      }
    
},
deleteSection:async(req,res)=>{
  try {
    const section = await Section.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!section) return res.status(404).json({msg: "n'existe pas "});
    const {title,description} = req.body;
    
        await Section.destroy({
            where:{
                id: section.id
            }
        });
        res.status(200).json({msg: "section deleted successfuly"});
      }catch (error) {
          res.status(500).json({msg: error.message});
      }
},
}


module.exports=SectionController
 