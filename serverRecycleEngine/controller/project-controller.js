const project = require('../models/project');
const Project=require('../models/project');
const User=require('../models/user')
module.exports = {
  async addProject(req, res, next) {
    const { name, location, category } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const project = new Project({
        name,
        location,
        category,
        user: user,
        // image: req.file.filename,
      });
  
      await project.save();
      user.save();
      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }, 
    async updateProject (req, res) {
      console.log('Request body:', req.body);
      console.log('Request files:', req.files);
      const projectName = req.params.name;
  const project = await Project.findOne({ name: projectName });

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
      
      project.name = req.body.name;
      project.subtitle=req.body.subtitle;
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
    },
    async getOneById (req, res, next) {
      try {
        const project = await Project.findById(req.params.id);
        if (project == null) {
          return res.status(404).json({ message: "cannot find project " });
        }
        res.project = project;
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    
      next();
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
    async getByName(req, res){
      try {
        const project = await Project.find({ name: req.params.name })
        if (project == null || project.length == 0) {
          return res.status(304).json({ message: "cannot find project" });
        }
        res.json(project[0]);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    async deleteAll(req, res){
      try {
        await project.remove({});
        res.json({ message: "All projects are deleted" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    async getAll(req, res) {
      User.find(function (err, projects) {
        res.json(projects);
      });
    }
  };
    
    
    


    


