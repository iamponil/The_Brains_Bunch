const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname); // File names will be unique based on the current date and time
    const filename = Date.now() + '-' + file.originalname;
    req.uploadedFileName = filename; // Save the uploaded file name to the request object
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
//   if (file.fieldname === 'image' || file.fieldname === 'video') { // Only accept files with the 'image' or 'video' field names
//     cb(null, true);
//   } else {
//     cb(new Error('Unexpected field'));
//   }
const allowedMimes = ['image/jpeg', 'image/png', 'video/mp4'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and MP4 files are allowed.'));
      }
}

const limits = {
  fileSize: 1024 * 1024 * 50 // 50 MB file size limit
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = upload;