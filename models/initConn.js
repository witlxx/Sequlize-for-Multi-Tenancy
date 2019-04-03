"use strict"

const Sequelize = require('sequelize');
const config = require('../config/config');
const username = config.sql.username;
const password = config.sql.password;
const host = config.sql.host;
const { exec } = require('child_process');
const initConn = require('../models/initConn');
const port = config.sql.port;

/**
 * createDatabase
 * @param {String} database
 * @return Promise{Boolean}
 */
let createDatabase = function (database) {
  return new Promise((resolve, reject) => {
    let sql = `mysql -h${host} -P${port} -u${username} -p${password} ` +
      `-e"create database if not exists ${database}"`;
    exec(sql, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else if (stderr) {
        resolve(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

exports.createDatabase = createDatabase;

/**
 * connDatabase
 * @param {String} database
 * @return Object{*}
 */
let connDatabase = function (database) {
  database = database ? database : config.sql.database;
  let sequelize = new Sequelize(
    `${database}`, `${username}`, `${password}`,
    {
      host: `${host}`,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: false
    });
  return sequelize;
};

exports.connDatabase = connDatabase;

/**
 * createTable
 * @param {String} database
 * @param {String} tableModelFile
 * @return Promise{Boolean}
 */
exports.createTable = async function (database, tableModelFile) {
  return new Promise((resolve, reject) => {
    let sequelize = connDatabase(database);
    let model = require(`./${tableModelFile}`).generateSchema(sequelize, database);
    model.then(m => {
      m.sync({ alter: true })
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};