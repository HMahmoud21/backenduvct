const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Categorie=require("./Categorie")

const SousCategorie =db.sequelize.define('souscategories', {
    UUid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    title: {
        type: Sequelize.STRING,
    },
    categorieId:{
        type: Sequelize.INTEGER,
       
    },
    ref:{
        type: Sequelize.STRING,
    },
    image:{
        type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.STRING,
    },
    
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    updatedAt:{
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
  
      },
},
{
  timestamps: false
}
    
);
  
 
Categorie.hasMany( SousCategorie );
SousCategorie .belongsTo(Categorie, {foreignKey: 'categorieId'});
  module.exports =  SousCategorie ;