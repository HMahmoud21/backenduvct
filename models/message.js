const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js');
const User=require('../models/UserModel.js')

const Message= db.sequelize.define(
  'messages',
  {
 
UUid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      validate:{
        notEmpty:true
      }
   },

message:{
    type: Sequelize.STRING,
},
destination:{
    type: Sequelize.STRING,
},
envoyerPar:{
    type: Sequelize.INTEGER,

},
destinataire:{
    type: Sequelize.INTEGER,

}, 
createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
updatedAt:{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW

},
},{
    
        freezeTableName: true
    });
    
User.hasMany(Message);
Message.belongsTo(User, {foreignKey: 'envoyerPar'});
Message.belongsTo(User, {foreignKey: 'destinataire'});
    
module.exports =Message