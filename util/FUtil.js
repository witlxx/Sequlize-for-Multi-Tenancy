"use strict"

const initConn = require('../models/initConn');

/**
 * createTenant
 * @param {String} cid
 * @return Promise{*}
 */
exports.createTenant = function (cid) {
  return new Promise((resolve, reject) => {
    if (!cid) {
      resolve({ errcode: 809, errmsg: `lack params ${cid}.` });
    } else {
      const dbName = `crop${cid}`;
      return initConn.createDatabase(dbName)
        .then(res => {
          if (!res) {
            resolve({ errcode: 842, errmsg: 'errors happen.' });
          } else {
            return Promise.all([
              initConn.createTable(dbName, 'User'),
              initConn.createTable(dbName, 'Department')
            ]).then(r => {
              resolve({ errcode: 200, errmsg: 'succeed to create tables.' });
            }).catch(e => {
              reject({ errcode: 841, errmsg: e });
            })
          }
        })
        .catch(err => {
          reject({ errcode: 840, errmsg: err });
        });
    }
  });
};