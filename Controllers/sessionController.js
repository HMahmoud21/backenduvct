const Session=require("../models/session")
const Section=require("../models/section")

const SessionController={
addSession:async(req,res)=>{
     
            const {title,article,file,video,ref,sectionId}= req.body
            try {
               
                const session = await Session.findOne({ where: { ref: ref } });
                if (session) {
                  return res.status(409).json({ msg: " existe déjà" }); 
                }
                const newSession= await Session.create({
                    title: title,
                  
                    article:article,
                    file:file,
                    ref: ref,
                    video:video,
                 
                    sectionId:sectionId
                  });
        
                res.status(201).json({ msg: "session créé avec succès",session: newSession });
            } catch (error) {
              console.error(error);
              res.status(500).json({ msg: "Une erreur est survenue lors de la création de section" });
            }
        
    },
getSession:async(req,res)=>{
        try {
            let response;
                response = await Session.findAll({
                    attributes:['title','description','article','file','video'],
                    include:[{
                        model: Section,
                        attributes:['title']
                    }]
                });
    
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}
},
updateSession :async(req, res) =>{
    try {
        const session = await Section.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!session) return res.status(404).json({msg: "n'existe pas "});
        const {title, description,file,video, article} = req.body;
        
            await Product.update({title, description,file,video, article},{
                where:{
                    id: session.id
                }
            });
 res.status(200).json({msg: "session updated successfuly"});
} catch (error) {
    res.status(500).json({msg: error.message});
}
},
deleteSession:async(req,res)=>{
    try {
        const session = await Section.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!session) return res.status(404).json({msg: "n'existe pas "});
        const {title, description,file,video, article} = req.body;
       
            await Session.destroy({
                where:{
                    id: session.id
                }
            });
res.status(200).json({msg: "Session deleted successfuly"});
} catch (error) {
    res.status(500).json({msg: error.message});
}
}
}


module.exports=SessionController