const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Formation = require('./formation');

const Categorie =db.sequelize.define('categories', {
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    ref:{
      type: Sequelize.STRING,
    },

    formationId: {
      type: Sequelize.INTEGER,
    }
  });
  

  module.exports = Categorie;







































/*

const Categorie= db.sequelize.define( 'formations',
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
 description:{
      type: DataTypes.STRING,
      allowNull: false,
     
  },
 image:{
      type: DataTypes.STRING,
      allowNull: false,
     
      
  },
  
  numero:{
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
    
    formationId:{
      type: DataTypes.INTEGER,
   
     
  },
 


  
},
{
  freezeTableName: true
}
);
Formation.hasOne(Categorie, { foreignKey: 'formationId' });
Categorie.belongsTo(Formation, { foreignKey: 'formationId' });

module.exports =Categorie*/
