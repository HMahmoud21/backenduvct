const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define(
  'users',
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
    name: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    email: {
        type: Sequelize.STRING,
        
    },
    password: {
        type: Sequelize.STRING,
        
    },
    tel: {
        type: Sequelize.INTEGER,

    }, 
    image: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING,
    },
     role: {
        type: Sequelize.INTEGER,
        defaultValue:"user",
    },
    activationCode: {
        type: Sequelize.STRING,
        
      },
    refresh_token:{
        type: DataTypes.TEXT
    },
    genre: {
        type: Sequelize.STRING,
        
    },
    message:{
        type: Sequelize.TEXT,
    },
    speciality:{
        type: Sequelize.STRING,
    },
    cv:{
        type: Sequelize.STRING,
    },
    site:{
        type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.TEXT,
    },
    statut:{
        type: Sequelize.STRING,
        defaultValue:"bloquer",//bloqué ou activé 
    },
    etat:{
        type: Sequelize.STRING,
        defaultValue:"en attente",//accepter/refuser

    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
        
  
    },
},
{
  timestamps: false
}
)