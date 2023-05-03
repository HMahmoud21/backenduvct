const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Formation = require('./formation'); 
const User= require('./UserModel');

const Achat =db.sequelize.define('achats', {
    UUid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt:{
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
    formationId: {
        type: Sequelize.INTEGER,
      },
    acheterpar:{
        type: Sequelize.INTEGER,
           
    },
    useruuid:{
        type: Sequelize.INTEGER,
    
    },
    favoris:{
      type: Sequelize.STRING,
      defaultValue:"normal",//accepter/refuser


    },
    formationUUid:{
      type: Sequelize.INTEGER,

    }
    },
      {
        freezeTableName: true
    });
    
User.hasMany(Achat);
Achat.belongsTo(User, {foreignKey: 'acheterpar'});
Formation.hasMany(Achat);
Achat.belongsTo(Formation, {foreignKey: 'formationId'});




module.exports =Achat;