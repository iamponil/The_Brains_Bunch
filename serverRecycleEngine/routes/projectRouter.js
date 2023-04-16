var express = require("express");
var router = express.Router();
const upload = require('../middleware/multerProject');
var ProjectController = require("../controller/project-controller");
const storage = require("../middleware/storage");
// router.put('/updateProject/:id', storage.upload_file("image","video"), ProjectController.updateProject);

//Add new Projects
router.post("/addProject",storage.upload_file("image"),ProjectController.addProject);
//Update Project
router.put('/updateProject/:name', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.updateProject);

module.exports = router;