"use strict"

const Sequelize = require('sequelize');
const moment = require('moment');

let departmentSchema = {
  DepartmentId: {type: Sequelize.BIGINT(9), allowNull: false, autoIncrement: true, primaryKey: true},
  Name: {type: Sequelize.STRING(200), defaultValue: 'other'},
  CreateTime: {type: Sequelize.DATE, defaultValue: null},
  DepartmentCode: {type: Sequelize.STRING(40), defaultValue: '00'}
};

exports.generateSchema = async function (sequelize, dbName) {
  let department = sequelize.define('department', departmentSchema, {
    tableName: 'department',
    timestamps: false
  });
  return department;
};