"use strict"

const FUtil = require('../util/FUtil');

FUtil.createTenant('123')
  .then(r => {
    console.log(r);
  })
  .catch(e => {
    console.log(e);
  });