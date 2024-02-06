const multer = require("multer");

const upload = multer(); // Limit file size to 5MB

module.exports = upload;
