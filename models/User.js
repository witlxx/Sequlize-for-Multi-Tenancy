"use strict"

const Sequelize = require('sequelize');
const moment = require('moment');

let userSchema = {
  UserId: { type: Sequelize.BIGINT(9), allowNull: false, autoIncrement: true, primaryKey: true },
  Account: { type: Sequelize.STRING(100), allowNull: false },
  BirthDay: { type: Sequelize.STRING(30), defaultValue: null },
  Sex: { type: Sequelize.STRING(20), defaultValue: null },
  CreateTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.Now,
    get() {
      return moment(this.getDataValue('timestamp')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  LastLoginTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.Now,
    get() {
      return moment(this.getDataValue('timestamp')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  VerCodeGenTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.Now,
    get() {
      return moment(this.getDataValue('timestamp')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  LoginTimesNo: { type: Sequelize.BIGINT(9), defaultValue: '0' }
};

exports.generateSchema = async function (sequelize, dbName) {
  let user = sequelize.define('user', userSchema, {
    tableName: 'user',
    timestamps: false
  });
  return user;
};