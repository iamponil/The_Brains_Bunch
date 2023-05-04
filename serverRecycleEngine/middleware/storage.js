const multer = require("multer");
const path = require("path");
const sharp = require('sharp');

const picsPath = require("path").resolve(__dirname, "../uploads");
//storage var (najmou nzidou constraints ba3d , mimeType, maxsize, ...)
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
const upload = multer({ storage: storage_mid });

module.exports = {

    upload_file: function(file){
        return upload.single(file)
    },




//Getting Image from uploads Directory
getImage :  async function(req, res) {

    let nom = req.params.nom;
    const file = picsPath + "/" + nom;
    console.log(file, "hy");
    res.sendFile(file); 
  }
}
