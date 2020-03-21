/**
 * requiring core module 
 */
const fs = require('fs');

/**
 * 
 * @param {function } filePath 
 * functionality to delete file 
 */
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    });
}

/**
 * functionality to export delete file function 
 */
exports.deleteFile = deleteFile;