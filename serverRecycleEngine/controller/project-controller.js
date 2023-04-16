const Project=require('../models/project');
// const upload = require('../middleware/multerProject'); // Import the multer middleware
// const multer = require('multer');

module.exports = {
  // async addProject(req, res, next) {
  //   const { name, location, category, subCategory } = req.body;
  
  //   try {
  //     // Get the user object from the currently authenticated user
  //     const userEmail = req.user.email;
  //     const user = await User.findOne({ email: userEmail });
  
  //     const project = new Project({
  //       name,
  //       location,
  //       category,
  //       subCategory,
  //       user: user._id, // Populate the user field with the user's _id
  //       image: req.file.filename,
  //     });
  
  //     await project.save();
  
  //     // Populate the user field of the returned project object with the user object
  //     await project.populate('user').execPopulate();
  
  //     res.json(project);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(400).json({ error: err.message });
  //   }
  // },
  
  async addProject(req, res, next) {
    const { name, location, category, subCategory } = req.body;
  
    try {
      // Get the user object from the currently authenticated user
      const userEmail = req.user.email;
      const user = await User.findOne({ email: userEmail });
  
      const project = new Project({
        name,
        location,
        category,
        subCategory,
        user: user._id, // Populate the user field with the user's _id
        image: req.file.filename,
      });
  
      await project.save();
  
      // Populate the user field of the returned project object with the user object
      await project.populate('user').execPopulate();
  
      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },
  
    // async addProject(req, res, next) {
    //     const { name, location, category, subCategory} = req.body;
    //     try {
    //       const project = new Project({
    //         name,
    //         location,
    //         category,
    //         subCategory,
            
    //         // image: req.file.filename ,// <-- use req.file.filename here
    //       });
    //       await project.save();
    //       res.json(project);
    //     } catch (err) {
    //       console.error(err);
    //       res.status(400).json({ error: err.message });
    //     }
    //   },
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
      project.category = req.body.category;
      project.subCategory = req.body.subCategory;
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
  };
    
    
    


    


