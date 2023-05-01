var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/Authorize");
const upload = require('../middleware/multerProject');
var ProjectController = require("../controller/project-controller");
const storage = require("../middleware/storage");
const {
    addLike,
    addDislike,
    addComment,
  } = require("../controller/project-controller");
// router.put('/updateProject/:id', storage.upload_file("image","video"), ProjectController.updateProject);

//Add new Projects
router.post("/addProject",authenticateToken,ProjectController.addProject);
//Update Project
router.post('/updateProject/:title',authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), ProjectController.updateProject);
//Delete Project
router.delete("/deleteProject",authenticateToken,ProjectController.deleteProject);
//getProjectByTitle
router.get("/getByTitle/:title",ProjectController.getByTitle);
//like project
router.post("/:projectId/like",authenticateToken,ProjectController.addLike);
//dislike project
  router.post("/:projectId/dislike",authenticateToken,ProjectController.addDislike);
  //add comment to project
  router.post("/:projectId/comment",authenticateToken,ProjectController.addComment);
  //add rating
  router.post("/:projectId/rating",authenticateToken,ProjectController.addRating);
module.exports = router;