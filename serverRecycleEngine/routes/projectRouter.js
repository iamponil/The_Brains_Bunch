// var express = require("express");
// var router = express.Router();
// const authenticateToken = require("../middleware/Authorize");
// const upload = require('../middleware/multerProject');
// var ProjectController = require("../controller/project-controller");
// const storage = require("../middleware/storage");
// //getProjectByName
// router.get("sendprojectByName/:name",authenticateToken,ProjectController.getByName);
// //Add new Projects
// router.post("/addProject",authenticateToken,ProjectController.addProject);
// //Update Project
// router.put('/updateProject/:name',authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.updateProject);
// //Delete Project
// router.delete("/deleteProject/:id",authenticateToken,ProjectController.getOneById,ProjectController.deleteProject);
// //getAllProjects
// router.get("getAll",ProjectController.getAll);
// //getProjectById
// router.get("ProjectById/:id",authenticateToken,ProjectController.getOneById);
// //DeleteAllProjects
// router.delete("deleteAll",authenticateToken,ProjectController.deleteAll);
// module.exports = router;
var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/Authorize");
const upload = require('../middleware/multerProject');
var ProjectController = require("../controller/project-controller");
// Get project by ID
router.get("/project/:id", authenticateToken, ProjectController.getOneById);

// Get project by name
router.get("/projectByName/:name", authenticateToken, ProjectController.getByName);

// Add new project
router.post("/addProject", authenticateToken, ProjectController.addProject);

// Update project
router.put('/updateProject/:name', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.updateProject);

// Delete project
router.delete("/deleteProject/:id", authenticateToken, ProjectController.getOneById, ProjectController.deleteProject);

// Get all projects
router.get("/getAll", ProjectController.getAll);

// Delete all projects
router.delete("/deleteAll", authenticateToken, ProjectController.deleteAll);

module.exports = router;
