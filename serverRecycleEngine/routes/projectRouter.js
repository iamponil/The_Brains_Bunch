var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/Authorize");
const { createContent } = require("../controller/contentController");
const upload = require("../middleware/multerProject");
var ProjectController = require("../controller/project-controller");
var analytics = require("../controller/analytics");

const storage = require("../middleware/storage");
const {
  addLike,
  addDislike,
  addComment,
} = require("../controller/project-controller");
router.post("/getAnalytics", authenticateToken, analytics.getPredictions);

// router.put('/updateProject/:id', storage.upload_file("image","video"), ProjectController.updateProject);
router.post(
  "/createCustomer",
  authenticateToken,
  ProjectController.paymentMethod
);
router.get("/getUserCard", authenticateToken, ProjectController.getUserCard);
router.post("/makeDonation", authenticateToken, ProjectController.makeDonation);
//Add new Projects
router.post("/addProject", authenticateToken, ProjectController.addProject);
//Update Project
router.post(
  "/updateProject/:title",
  authenticateToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  ProjectController.updateProject
);
router.post(
  "/updateAnalytics/:title",
  authenticateToken,
  ProjectController.updateAnalytics
);

//getProjectByTitle
router.get("/getByTitle/:title", ProjectController.getByTitle);
//GetProjectsByUser
router.get("/GetProjectsByUser/:id", ProjectController.GetProjectsByUser);
// Get all projects
router.get("/getAll", ProjectController.getAll);

router.get("/getProjectById/:id", ProjectController.getProjectById);
router.get("/:id/comments", ProjectController.getAllCommentsByProjectId);

router.delete(
  "/deleteProject/:id",
  authenticateToken,
  ProjectController.getOneById,
  ProjectController.deleteProject
);
// Delete all projects
router.delete("/deleteAll", authenticateToken, ProjectController.deleteAll);
//like project
router.post("/:projectId/like", authenticateToken, ProjectController.addLike);
//dislike project
router.post(
  "/:projectId/dislike",
  authenticateToken,
  ProjectController.addDislike
);
//add comment to project
router.post(
  "/:projectId/comment",
  authenticateToken,
  ProjectController.addComment
);
//add rating
router.post("/:projectId/rating", ProjectController.addRating);

//recommendation projects
router.get("/recommended-projects", ProjectController.getRecommendedProjects);

module.exports = router;
