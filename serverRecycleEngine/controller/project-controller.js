const Project=require('../models/project');
const User=require('../models/user');
const Comment=require("../models/comment")
// const upload = require('../middleware/multerProject'); // Import the multer middleware
// const multer = require('multer');
const passport=require('passport');
module.exports = {
  async addProject(req, res, next) {
    const { title, location, category } = req.body;
    try {
      const user = await User.findById(req.user.id);

      const project = new Project({
        title,
        location,
        category,
        user: user.id,
      });

      await project.save();

      user.projects.push(project);
      await user.save();
      console.log(user)
      // Fetch the updated user object to return in the response
      // const updatedUser = await User.findById(user.id).populate('projects');

      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },
    async updateProject (req, res) {
      console.log('Request body:', req.body);
      console.log('Request files:', req.files);
      const projectName = req.params.title;
  const project = await Project.findOne({ title: projectName });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // check if there is an image file in the request
      if (req.files && req.files.image) {
        project.image = req.files.image[0].path;
      }
      
      // check if there is a video file in the request
      if (req.files && req.files.video) {
        project.video = req.files.video[0].path;
      }
      
      project.title = req.body.title;
      project.category = req.body.category;
      project.location = req.body.location;
      project.fundGoal = req.body.fundGoal;
      project.subtitle = req.body.subtitle;
      project.duration = req.body.duration;
      project.launchingDate = req.body.launchingDate;

      
      try {
        const updatedProject = await project.save();
      
        res.status(200).json({
          message: "Project updated successfully",
          project: updatedProject,
        });
      } catch (error) {
        console.log('Error while saving project:', error);
        res.status(400).json({ message: error.message });
      }
    },
    async deleteProject (req, res) {
      try {
        console.log(res.project) 
        await res.project.remove();
        res.json(true);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    async getByTitle(req, res){
      try {
        const project = await Project.find({ title: req.params.title })
        if (project == null || project.length == 0) {
          return res.status(304).json({ message: "cannot find project" });
        }
        res.json(project[0]);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

   async GetProjectsByUser(req,res){
      try {
        const userId = req.params.id;
        const projects = await Project.find({ user: userId });
        res.json(projects);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
 
    
    
    
 
  async addLike(req, res) {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
   
      
  
      if (project.likedBy.includes(userId)) {
        return res.status(400).json({ message: "User already liked this project" });
      }
        // check if user has disliked the project before
        const hasDisliked = project.dislikedBy.includes(userId);
        if (hasDisliked) {
          project.dislikes--;
          const userIndex = project.dislikedBy.indexOf(userId);
          project.dislikedBy.splice(userIndex, 1);
        }
    
      project.likes++;
      project.likedBy.push(userId);
      await project.save();
  
      res.status(200).json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  async addDislike(req, res) {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      if (project.dislikedBy.includes(userId)) {
        return res.status(400).json({ message: "User already disliked this project" });
      }
  
      // check if user has liked the project before
      const hasLiked = project.likedBy.includes(userId);
      if (hasLiked) {
        project.likes--;
        const userIndex = project.likedBy.indexOf(userId);
        project.likedBy.splice(userIndex, 1);
      }
  
      project.dislikes++;
      project.dislikedBy.push(userId);
      await project.save();
  
      res.status(200).json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  //add Comment 
   async addComment  (req, res) {
    try {
      const { projectId } = req.params;
      const { content } = req.body;
      const project = await Project.findById(projectId);
     
      const comment = new Comment({
        content,
        user: req.user.id,
        project: project._id,
      });
      await comment.save();
      project.comment.push(comment);
      await project.save();
    
      res.status(201).json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
  async addRating(req, res)  {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);
      if (!project) throw new Error("Project not found");
  
      const rating = req.body.rating;
      if (!rating || rating < 1 || rating > 5)
        throw new Error("Invalid rating value");
  
      project.ratings.push(rating);
      const totalRatings = project.ratings.length;
      const ratingSum = project.ratings.reduce((sum, r) => sum + r, 0);
      const averageRating = ratingSum / totalRatings;
  
      project.averageRating = averageRating;
      await project.save();
  
      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  } };