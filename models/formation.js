const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js');
const User=require('../models/UserModel.js')

const Formation = db.sequelize.define(
  'formations',
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
    subTitle: {
        type: DataTypes.STRING,
      },
    description: {
        type: DataTypes.TEXT,
      },
    level: {
        type: DataTypes.STRING,
    },
    videopromo: {
        type: DataTypes.STRING,
      },
    objectif: {
        type: DataTypes.TEXT,
      },
    prerequis: {
        type: DataTypes.STRING,
      },
    intendedFor: {
        type: DataTypes.STRING,
      },
    free: {
       
        type: DataTypes.INTEGER,
        defaultValue:0
      },
    categorie:{
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
 
    ref:{
        type: DataTypes.STRING,
      
    },
    offre:{
        type: DataTypes.STRING,
      
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    updatedAt:{
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
  
      },
    status:{
          type: Sequelize.INTEGER,
          defaultValue:"archiver",// status : publier , depublier ,archiver 
      },
    
    postedBy: {
        type: Sequelize.INTEGER,
        required:true,
      },
    
  },
  {
    freezeTableName: true
});

 User.hasMany(Formation);
Formation.belongsTo(User, {foreignKey: 'postedBy'});

module.exports =Formation




























