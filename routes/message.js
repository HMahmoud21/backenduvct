const express = require("express");
const MessageController = require("../Controllers/messageController");
const router = express.Router(); 

router.post("/envoyerMessage/:uuid",MessageController.envoyerMessage)






module.exports=router