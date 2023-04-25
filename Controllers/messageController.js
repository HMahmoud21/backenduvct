const User=require("../models/UserModel");
const Message=require("../models/message")

const MessageController={
    
    envoyerMessage:async(req,res)=>{ 
         const uuid=req.params.uuid// id ili yb3th 
         const {message,destination}=req.body
        
        // const user = await User.findOne({ 
        //     where: { 
        //        uuid:uuid
        //      } });
        //      console.log(user)

        //     const userId=user.uuid
        
    try{

     
        await Message.create({
           message:message,
           destination:destination,
           envoyerPar:uuid,
           destinataire: req.userId
          });
    
          res.status(201).json({ msg: "messgae envoyer " });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Une erreur est survenue lors de l'envoie " });
        }
    

    }



}
module.exports=MessageController