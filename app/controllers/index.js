const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let controllers = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const controller = require(path.join(__dirname, file));
    const key = file.split('.')[0];
    controllers[`${key}Controller`] = controller;
  });

module.exports = controllers;
