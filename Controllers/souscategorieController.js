const Categorie= require("../models/Categorie")
const SousCategorie=require("../models/SousCategorie");

const souscategorieController={

createsouscategorie:async(req,res)=>{
    const {title,image,description,ref} = req.body
    try {
    const souscategorie = await SousCategorie.findOne({
        ref:ref
    })
    if (!souscategorie) {
        return res.status(409).json({ msg: "souscatégorie  existe déjà" }); // Utilisation du code d'état 409 Conflict pour indiquer que la demande ne peut être traitée en raison d'un conflit avec les ressources existantes.
      }
      const newSousCategorie= await SousCategorie.create({ 
      title: title,
      image:image,
      description:description,
      ref: ref,
     categorieId:req.params.id
     
    });

    res.status(201).json({ msg: "souscategorie créé avec succès", souscategorie: newSousCategorie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Une erreur est survenue lors de la création de sous categorie" });
  }

},
getallscat:async(req,res)=>{
    try {
        let response;
        
            response = await SousCategorie.findAll({
                attributes:['title','description','image'],
                include:[{
                  model: Categorie,
                  attributes:['title']
              }],
                
            });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }


},
getscatById:async(req,res)=>{
    try{
    const souscategorie = await SousCategorie.findone({
        where:{
            uuid: req.params.id
        }
    })
    res.json(souscategorie)
} catch (err) {
    return res.status(500).json({msg: err.message})
}


},
updatecat:async(req,res)=>{
    const ref = req.body.ref
    try {
        const souscategorie = await SousCategorie.findOne({
            where:{
                //uuid: req.params.id
                ref:ref
            }
        });
        if(!souscategorie) return res.status(404).json({msg: "sous categorie n'existe pas "});
        const {title,description} = req.body;
       
            await SousCategorie.update({title,description},{
                where:{
                    //id: souscategorie.id
                    ref:ref
                }
            });
            res.status(200).json({msg: "updated successfuly"});
     }catch (error) {
        res.status(500).json({msg: error.message});
    }

}, 
deletesoucat:async(req,res)=>{
    try {
        const souscategorie = await SousCategorie.findOne({
            where:{
                uuid: req.params.id
                //ref:req.boby.ref
            }
        });
        if(! souscategorie) return res.status(404).json({msg: "souscategorie n'existe pas "});
        const {title,description} = req.body;
       
            await Product.destroy({
                 where:{
                    id: souscategorie.id
                }
            });
      
        res.status(200).json({msg: "Product deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

},


}
module.exports=souscategorieController