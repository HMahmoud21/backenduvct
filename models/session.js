const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Section=require("./section")

const Session =db.sequelize.define('session', {
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

article: {
    type: Sequelize.STRING,
},
file: {
    type: Sequelize.STRING,
},
video: {
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
sectionId:{
    type: DataTypes.INTEGER, 
},
sectionUUid:{type: DataTypes.INTEGER, 

},
ref:{
    type: Sequelize.STRING,
}

}, {
    timestamps: true
})
Section.hasMany(Session);
Session.belongsTo(Section, {foreignKey: 'sectionId'});

module.exports =Session