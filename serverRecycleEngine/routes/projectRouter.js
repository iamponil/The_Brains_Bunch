var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/Authorize");
const upload = require('../middleware/multerProject');
var ProjectController = require("../controller/project-controller");
const storage = require("../middleware/storage");
// router.put('/updateProject/:id', storage.upload_file("image","video"), ProjectController.updateProject);

//Add new Projects
router.post("/addProject",authenticateToken,ProjectController.addProject);
//Update Project
router.put('/updateProject/:name',authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.updateProject);
//Delete Project
router.delete("/deleteProject/:id",authenticateToken,ProjectController.getOneById,ProjectController.deleteProject);
//getAllProjects
router.get("getAll",ProjectController.getAll);
//getProjectById
router.get("getProject/:id",authenticateToken,ProjectController.getOneById);
//getProjectByName
router.get("getProjectByName/:name",authenticateToken,ProjectController.getByName);
//DeleteAllProjects
router.delete("deleteAll",authenticateToken,ProjectController.deleteAll);
module.exports = router;