const Section= require("../models/section")
const Formation=require("../models/formation")
const Session =require("../models/session")

const SectionController={
addsection:async(req,res)=>{ 
    const today = new Date(); 
    const {title,objectif,ref} = req.body
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
            formationId:req.params.id
            
        
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
getsectionByid: async (req, res) => {
    try {
        const uuid = req.params.uuid;
      console.log(uuid)
    
  
      const section = await Section.findOne({
        where: { UUid: uuid }
      });
  
      if (!section) {
        return res.status(404).json({ msg: "Section n'existe pas" });
      }
  
      const response = await Section.findOne({
        attributes: ["title"],
        where: { UUid: uuid},
        include: [
          {
            model: Formation,
            attributes: ["title"]
          }
        ]
      });
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
updateSection:async(req,res)=>{
  try {
    const uuid = req.params.uuid;
    console.log(uuid)

   const section = await Section.findOne({
        where: { UUid: uuid }
      });
  
      if (!section) {
        return res.status(404).json({ msg: "Section n'existe pas" });
      }
    const {title,objectif,ref} = req.body
   
        await Section.update({title,objectif,ref} ,{
            where:{
                 UUid: uuid
            }
        });
        res.status(200).json({msg: "section updated successfuly"});
      }catch (error) {
          res.status(500).json({msg: error.message});
      }
    
},
deleteSection:async(req,res)=>{
  try {
    const uuid = req.params.uuid;
    console.log(uuid)

   const section = await Section.findOne({
        where: { UUid: uuid }
      });
  
      if (!section) {
        return res.status(404).json({ msg: "Section n'existe pas" });
      }

    
        await Section.destroy({
            where:{
                UUid: uuid 
            }
        });
        res.status(200).json({msg: "section deleted successfuly"});
      }catch (error) {
          res.status(500).json({msg: error.message});
      }
},
get55:async(req,res)=>{
  const uuid = req.params.uuid;
    console.log(uuid)
    try {
    const response = await Section.findOne({
      attributes: ["title"],
      where: { UUid: uuid},
      include: [
        {
          model: Session,
          attributes: ["title"]
        }
      ]
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

}
}


module.exports=SectionController
 