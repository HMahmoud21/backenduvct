const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js');
const User=require('../models/UserModel.js')

const Reclamation = db.sequelize.define( 'reclamations', {
 
  UUid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue:DataTypes.UUIDV4,
    allowNull:false,
    validate:{
      notEmpty:true
    }
 },
  sujet:{
    type: Sequelize.STRING,
},
typeCompte:{
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
userId:{
    type: Sequelize.INTEGER,
        required:true,
},
useruuid:{
    type: Sequelize.INTEGER,

},
},
  {
    freezeTableName: true
});

 User.hasMany(Reclamation);
Reclamation.belongsTo(User, {foreignKey: 'userId'});

module.exports =Reclamation