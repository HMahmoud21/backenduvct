const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Formation=require("./formation")

const Section =db.sequelize.define('sections', {
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
    objectif: {
        type: Sequelize.STRING,
    },
    ref:{
        type: Sequelize.STRING,

    },
    
   formationUUid:{
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

}, {
    timestamps: true
})
Formation.hasMany(Section);
Section.belongsTo(Formation, {foreignKey: 'formationId'});

module.exports =Section