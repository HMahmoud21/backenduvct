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
      
    },
    tel: {
      type: Sequelize.INTEGER,
      

    }, 
    
    email: {
      type: Sequelize.STRING,
      
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
      
      
    },
    image: {
      type: Sequelize.STRING,
    },
   
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
      

    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue:1,
      
    
  },
  activationCode: {
    type: Sequelize.STRING,
    allowNull:true
  },

  refresh_token:{
        type: DataTypes.TEXT
    }

    
  },
  {
    timestamps: false
  }
)