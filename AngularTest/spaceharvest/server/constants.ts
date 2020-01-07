export {};
const path = require('path');
const fs = require('fs');

module.exports.distFolder = path.join(__dirname, '..', '/dist/spaceharvest');
module.exports.port = process.env.PORT || 3000;


