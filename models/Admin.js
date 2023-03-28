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
  
      genre: {
        type: Sequelize.STRING,
        allowNull:false,
      
        
      
      },
      tel: {
        type: Sequelize.INTEGER,
        allowNull:false,
        
        
  
      },
    email: {
      type: Sequelize.STRING,
    
      isEmail:true,
      validate:{
        notEmpty:true,
        isEmail:true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }

    }, 
    
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
      

    },role: {
      type: Sequelize.INTEGER,
      defaultValue:4,
      
    
  },
    
  },
  {
    timestamps: false
  }
)