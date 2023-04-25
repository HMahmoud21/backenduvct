const Coupon =require("../models/coupon")
const Formation=require("../models/formation")

const CouponController={
    Addcoupon:async(req,res)=>{
        const {code, discount, number, dateStart, dateEnd, statut} = req.body
        try {
       
            const coupon= await Coupon.findOne({ where: { code:code} });
            if (coupon) {
              return res.status(409).json({ msg: " existe déjà" }); // Utilisation du code d'état 409 Conflict pour indiquer que la demande ne peut être traitée en raison d'un conflit avec les ressources existantes.
            }
        
            // Créer une nouvelle evenement avec l'ID de l'instructeur et de l'admin associés.
            const newcoupn = await Coupon.create({
                code:code,
                discount:discount,
                number:number,
                dateStart:dateStart,
                dateEnd:dateEnd,
                statut:"true",
              formationId:req.params.id
            });
        
            res.status(201).json({ msg: "coupon ajouté avec succès", coupon :  newcoupn });
          } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Une erreur est survenue lors de la création du coupon " });
          }


    },
    getAllcoupon:async(req,res)=>{
        try {
            let response;
            
                response = await Coupon.findAll({
                    attributes:['code','discount','dateStart','dateEnd','createdAt'],
                    include:[{
                      model: Formation,
                      attributes:['title']
                  }]
                    
                });
            
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }

    },
    getCouponById: async(req,res)=>{
        const uuid= req.params.uuid;
        try {
          let response;
          
              response = await Coupon.findOne({
                attributes:['code','discount','dateStart','dateEnd','createdAt'],
                include:[{
                  model: Formation,
                  attributes:['title']
              }],
                where:
                {
                     uuid:uuid
                }
                  
              });
          
          res.status(200).json(response);
      } catch (error) {
          res.status(500).json({msg: error.message});
      }

    },
    deleteCoupon:async(req, res) =>{
        const uuid= req.params.uuid;
              try {
                  const coupon= await Coupon.findOne({
                      where:{
                        uuid:uuid
                      }
                  });
                  if(!coupon) return res.status(404).json({msg: "coupon n'existe pas "});
                  
                 
                      await Coupon.destroy({
                          where:{
                            uuid:uuid
                          }
                      });
                      res.status(200).json({msg: "coupon  supprimé "});
                    } catch (error) {
                        res.status(500).json({msg: error.message});
                    }
    },
    updateCupon:async(req,res)=>{
        try {
            const uuid = req.params.uuid;
            const coupon = await Coupon.findOne({
                where:{
                    uuid: uuid
                }
            });
            if(!coupon) return res.status(404).json({msg: "n'existe pas "});
            const {code, discount, number, dateStart, dateEnd,statut} = req.body
             
                await Coupon.update({
                    code, discount, number, dateStart, dateEnd,statut
                 },{
                    where:{
                       uuid:uuid
                    }
                });
            
            res.status(200).json({msg: "mise à jour fait avec succes "});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    desactiverCoupon:async(req,res)=>{
        try {
        const uuid = req.params.uuid;
        const coupon = await Coupon.findOne({
            where:{
                uuid: uuid
            }
        });
        if(!coupon) return res.status(404).json({msg: "n'existe pas "});
    
         
            await Coupon.update({
             statut:"false"
             },{
                where:{
                   uuid:uuid
                }
            });
        
        res.status(200).json({msg: "mise à jour fait avec succes "});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

    }
    

    }
      




module.exports=CouponController