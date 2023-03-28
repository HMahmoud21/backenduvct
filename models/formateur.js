const {Sequelize,DataTypes} = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define(
   'instructeurs',
  {
    UUid: {
      type: Sequelize.UUID,
      
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    name: {
      type: Sequelize.STRING,
   
      
     
    },
    email: {
      type: Sequelize.STRING,primaryKey: true,
      allowNull:false,
      isEmail:true,
     
    },
    tel: {
      type: Sequelize.STRING,
      allowNull:false,
    
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    message:{
      type:Sequelize.STRING,

    },
    role:{
      type:Sequelize.STRING,
      defaultValue:"candidat",


    },
    
  },
    
  
  {
    timestamps: false
  }
)