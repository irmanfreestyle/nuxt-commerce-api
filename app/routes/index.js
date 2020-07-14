const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports = (app) => {
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const router = require(path.join(__dirname, file));
      const key = file.split('.')[0];
      app.use(`/${key}`, router);
    });
};
