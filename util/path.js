/**
 * requiring core module 
 */
const path = require('path');

/**
 * exporting the module 
 */
module.exports = path.dirname(process.mainModule.filename);