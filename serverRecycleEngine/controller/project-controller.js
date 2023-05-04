const Project=require('../models/project');
const User=require('../models/user')
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
  async updateProject(req, res) {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    const projectName = req.params.title;
    const project = await Project.findOne({ title: projectName });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // check if there is an image file in the request
    if (req.files && req.files.image) {
      project.image = req.files.image[0].filename;
    }

    // check if there is a video file in the request
    if (req.files && req.files.video) {
      project.video = req.files.video[0].filename;
    }

    project.title = req.body.title;
    project.subtitle = req.body.subtitle;
    project.category = req.body.category;
    project.location = req.body.location;
    project.duration = req.body.duration;
    project.launchingDate = req.body.launchingDate;
    project.budget = req.body.budget;

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
  }
,

async getOneById(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    console.log(project);
    if (project == null) {
      return res.status(404).json({ message: "Cannot find project" });
    }
    res.project = project;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
},
async getProjectById(req, res) {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error while getting project by ID", error);
    res.status(500).json({ message: error.message });
  }
},
async deleteProject(req, res) {
  try {
    await res.project.remove(); // Use req.project instead of res.project
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
    async deleteAll(req, res) {
      try {
        await project.remove({});
        res.json({ message: "All projects are deleted" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    async getAll(req, res) {
      Project.find(function (err, projects) {
        res.json(projects);
      });
    }
     
  };
    
    
    
