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
router.post('/updateProject/:title',authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.updateProject);
//getProjectByTitle
router.get("/getByTitle/:title",ProjectController.getByTitle);
//GetProjectsByUser
router.get("/GetProjectsByUser/:id",ProjectController.GetProjectsByUser)
// Get all projects
router.get("/getAll", ProjectController.getAll);

router.get("/getProjectById/:id", ProjectController.getProjectById);

router.delete("/deleteProject/:id", authenticateToken, ProjectController.getOneById, ProjectController.deleteProject);
// Delete all projects
router.delete("/deleteAll", authenticateToken, ProjectController.deleteAll);
module.exports = router;