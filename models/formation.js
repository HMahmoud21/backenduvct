const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js');
const Instructeur = require('./Instructeur.js');

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
    categorie:{
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
    
    numero:{
        type: DataTypes.INTEGER,
      
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
          defaultValue:0,
      },
      instructeurId:{
        type: DataTypes.INTEGER,
     
       
    },
    instructeurUUid:{
        type: DataTypes.INTEGER,
        defaultValue:null
    },


    
  },
  {
    freezeTableName: true
});

  Instructeur.hasMany(Formation);
Formation.belongsTo(Instructeur, {foreignKey: 'instructeurId'});

module.exports =Formation




























/*const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js')
const Instructeur=require('./Instructeur');

const Formation = db.sequelize.define(
  'formations',
  {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
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
    
    categorie:{
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
    numero:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    instructeurId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
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
    status:{
        type: Sequelize.INTEGER,
        defaultValue:0,
    }
},{
    freezeTableName: true
});

Instructeur.hasMany(Formation);
Formation.belongsTo(Instructeur, {foreignKey: 'instructeurId'});

module.exports = Formation;*/