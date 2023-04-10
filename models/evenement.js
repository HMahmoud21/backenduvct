const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js');
const User=require('../models/UserModel.js')

const Evenement = db.sequelize.define(
  'evenement',
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
title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }

    },
details:{
        type: DataTypes.STRING,
        allowNull: false,
       
    },
price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
ref:{
        type: DataTypes.STRING,
      
    },
    
typeEvent:{
        type: DataTypes.STRING,
      
    },
nbTicket:{
        type: DataTypes.INTEGER,
      
    },
createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
updatedAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

    },

datedeb:{
          type: Sequelize.DATE,
        
      },
datefin:{
        type: Sequelize.DATE,
      
    },
affiche:{
        type: Sequelize.STRING,
      
    },
free:{
        type: DataTypes.BOOLEAN, 
        defaultValue:0  
    },
online:{
        type: DataTypes.BOOLEAN, 
        defaultValue:0    
    },
surPlace:{
        type: DataTypes.BOOLEAN, 
        defaultValue:0    
    },
postedBy: {
        type: Sequelize.INTEGER,
    },
    status:{
        type: Sequelize.INTEGER,
        defaultValue:"archiver",// status : publier , depublier ,archiver 
    },


    
  },
  {
    freezeTableName: true
});

User.hasMany(   Evenement);
Evenement.belongsTo(User, {foreignKey: 'postedBy'});

module.exports =Evenement



























