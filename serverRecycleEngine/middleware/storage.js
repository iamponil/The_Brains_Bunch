const multer = require("multer");
const path = require("path");
const sharp = require('sharp');
const videoPath = require("path").resolve(__dirname, "../videos");
const picsPath = require("path").resolve(__dirname, "../uploads");
const storage_vid = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./videos");
    },
    filename: async(req, file, cb) => {
        const newFileName = (+new Date()).toString() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})
const storage_mid = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: async(req, file, cb) => {
        await sharp(file)
        .resize(320, 240)
        const newFileName = (+new Date()).toString() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const uploadVideo = multer({ storage: storage_vid });
const upload = multer({ storage: storage_mid });
module.exports = {
    upload_file: function(file) {
        if (file === 'video') {
            return uploadVideo.single(file);
        } else if (file === 'image') {
            return upload.single(file);
        } else {
            throw new Error('Invalid file type');
        }
    },

    //Getting Video from videos Directory
    getVideo: async function(req, res) {
        let nom = req.params.nom;
        const file = videoPath + "/" + nom;
        console.log(file, "hy");
        res.sendFile(file);
    },
    getImage :  async function(req, res) {

        let nom = req.params.nom;
        const file = picsPath + "/" + nom;
        console.log(file, "hy");
        res.sendFile(file); 
      }}




