const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Formation = require('./formation');
const Coupon =db.sequelize.define('coupons', {
    UUid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    code: {
        type: Sequelize.STRING,
    },
    discount: {
        type: Sequelize.STRING,
    },
    number: {
        type: Sequelize.INTEGER,
    },
    dateStart: {
        type: Sequelize.DATE
    },
    dateEnd: {
        type: Sequelize.DATE
    },
    statut: {
        type: Sequelize.STRING,
        default:false,
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
      }



});
  
Coupon.belongsTo(Formation, { foreignKey: 'formationId', unique: true });
Formation.hasOne(Coupon, { foreignKey: 'formationId' });

module.exports =Coupon;
