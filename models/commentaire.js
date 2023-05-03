const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Formation = require('./formation'); 
const User= require('./UserModel');

const Commentaire =db.sequelize.define('commentaires', {
    UUid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    NomSession: {
        type: Sequelize.STRING,
        
    },
   Message: {
    type: Sequelize.STRING,
       
    },
    response:{  
      type: Sequelize.STRING,
      defaultValue:"null"
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
    envoyerpar:{
        type: Sequelize.INTEGER,
           
    },
    useruuid:{
        type: Sequelize.INTEGER,
    
    },
    formationUUid:{
      type: Sequelize.INTEGER,

    }
    },
      {
        freezeTableName: true
    });
    
User.hasMany(Commentaire);
Commentaire.belongsTo(User, {foreignKey: 'envoyerpar'});
Formation.hasMany(Commentaire);
Commentaire.belongsTo(Formation, {foreignKey: 'formationId'});




module.exports =Commentaire;