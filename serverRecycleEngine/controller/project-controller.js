const Project = require("../models/project");
const User = require("../models/user");
const Comment = require("../models/comment");
const Payment = require("../models/payment");
const FundedProject = require("../models/fundedProject");

// const upload = require('../middleware/multerProject'); // Import the multer middleware
// const multer = require('multer');
const passport = require("passport");
const stripe = require("stripe")(
  "sk_test_51N5Zj1Hnio4ZCXO9a2JTfHTfewIucvJ29nSrwAukesm3C3cJVGIJSfcaxix8Ao46K1rlcHcsCJslcr5wqd8iD3QI00C0E1vWzk"
);

module.exports = {
  async paymentMethod(req, res, next) {
    try {
      console.log(req.body);
      const min = 1000;
      const max = 2000;
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      const id = req.body.payload.id;
      const user = await User.findById(id);
      const exp_month = req.body.expiry.slice(0, 2);
      const exp_year = req.body.expiry.slice(3, 5);
      const customer = await stripe.customers.create({
        description:
          "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
        balance: 400,
      });
      const account = await stripe.accounts.create({
        type: "custom",
        country: "NL",
        email: "marwa.memmi@esprit.tn",
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
      });
      console.log(req.body);
      const token = await stripe.tokens.create({
        card: {
          number: req.body.number,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: req.body.cvc,
        },
      });

      const card = await stripe.customers.createSource(customer.id, {
        source: token.id,
      });

      const paymentDb = new Payment({
        accountId: account.id,
        brand: card.brand,
        exp_month: card.exp_month,
        exp_year: card.exp_year,
        tokenId: token.id,
        cardId: card.id,
        name: req.body.name,
        email: user.email,
        number: req.body.number,
        balance: randomNum,
        cvc: req.body.cvc,
        customerId: customer.id,
      });
      await paymentDb.save();
      user.payment = paymentDb._id;
      await user.save();
      console.log(paymentDb);
      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
  async makeDonation(req, res) {
    const userId = req.payload.id;
    const projectId = req.body.id_project;
    const balance = req.body.initialBalance;
    const amount = Number(req.body.amountValue);
    console.log(amount, projectId);
    const user = await User.findById(userId).populate("payment");
    const project = await Project.findById(projectId);
    const paymentMethod = user.payment;
    console.log(paymentMethod._id);
    // Create a new projectFunded document
    const projectFunded = new FundedProject({
      project: projectId,
      reservedAmount: amount,
      cards: [paymentMethod._id],
    });
    await projectFunded.save();
    project.fundedProject.push(projectFunded._id);
    project.fundGoalProgress += amount;
    await project.save();

    // Update the paymentMethod reservedAmount
    paymentMethod.reservedAmount += amount;
    paymentMethod.balance = balance;
    await paymentMethod.save();
    res.status(200).send("Donation successful");
  },

  async startAllCountdowns() {
    const projects = await Project.find();
    for (const project of projects) {
      const projectId = project._id;
      let intervalID = setInterval(async () => {
        const updatedProject = await Project.findById(projectId);
        if (!updatedProject) {
          console.log(`Project ${projectId} not found`);
          clearInterval(intervalID);
          return;
        }
        let updatedDuration = updatedProject.duration - 60;
        updatedDuration = Math.max(updatedDuration, 0);
        updatedProject.duration = updatedDuration;
        await updatedProject.save(); // Add this line to save the updated duration to the database
        console.log(
          `Project ${projectId}: Duration ${updatedDuration} seconds`
        );
        if (updatedDuration <= 0) {
          console.log(`Project ${projectId}: Duration has ended`);
          clearInterval(intervalID);

          try {
            const project = await Project.findById(projectId).populate({
              path: "fundedProject",
              populate: { path: "payments" },
            });

            // Check if the project's fund goal has been reached
            if (project.fundGoalProgress < project.fundGoal) {
              console.log("Project fund goal has not been reached");
              return;
            }

            // Check if the project's duration has expired
            if (new Date() < new Date(project.duration)) {
              console.log("Project duration has not expired yet");
              return;
            }

            // Calculate the total amount of reserved funds in the projectFunded table
            const totalReservedFunds = project.fundedProject.reduce(
              (total, funded) => total + funded.reservedAmount,
              0
            );

            // Get the user who created the project
            const projectCreator = await User.findById(project.user);

            // Transfer the funds from each payment to the project creator's payment method
            await Promise.all(
              project.fundedProject.map(async (funded) => {
                const payments = await Payment.find({
                  _id: { $in: funded.payments },
                });

                await Promise.all(
                  payments.map(async (payment) => {
                    console.log("it worked");
                    const transferAmount =
                      (payment.reservedAmount / funded.reservedAmount) *
                      totalReservedFunds;

                    // Subtract the transfer amount from the payment's reserved amount
                    await Payment.findByIdAndUpdate(payment._id, {
                      reservedAmount: payment.reservedAmount - transferAmount,
                    });
                    console.log("it worked");
                    // Subtract the transfer amount from the payment's balance
                    const updatedPayment = await Payment.findByIdAndUpdate(
                      payment._id,
                      { $inc: { balance: -transferAmount } },
                      { new: true }
                    );

                    // Add the transfer amount to the project creator's payment method balance
                    await Payment.findOneAndUpdate(
                      { _id: projectCreator.payment },
                      { $inc: { balance: transferAmount } }
                    );
                  })
                );
              })
            );
          } catch (err) {
            console.error(err);
          }
        }
      }, 60000);
    }
  },

  async getUserCard(req, res) {
    const id = req.payload.id;
    try {
      const user = await User.findById(id).populate("payment");
      const card = user?.payment || null;
      if (card) {
        card.expiry = `${card.exp_month}/${card.exp_year.slice(2, 4)}`;
      }
      console.log(card);
      console.log(card.expiry);
      res.json({ card: card, expiry: card.expiry });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching user address" });
    }
  },

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
      console.log(user);
      // Fetch the updated user object to return in the response
      // const updatedUser = await User.findById(user.id).populate('projects');

      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },
  async updateAnalytics(req, res) {
    console.log("Request body:", req.body);
    const projectName = req.params.title;
    const project = await Project.findOne({ title: projectName });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.analytics = req.body.analytics;
    try {
      const updatedProject = await project.save();

      res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.log("Error while saving project:", error);
      res.status(400).json({ message: error.message });
    }
  },
  async updateProject(req, res) {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
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
    project.fundGoal = req.body.fundGoal;
    project.duration = req.body.duration * 24 * 60 * 60;
    project.launchingDate = req.body.launchingDate;
    project.budget = req.body.budget;

    try {
      const updatedProject = await project.save();

      res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.log("Error while saving project:", error);
      res.status(400).json({ message: error.message });
    }
  },
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

  async getByTitle(req, res) {
    try {
      const project = await Project.find({ title: req.params.title });
      if (project == null || project.length == 0) {
        return res.status(304).json({ message: "cannot find project" });
      }
      res.json(project[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async GetProjectsByUser(req, res) {
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
  // async getAll(req, res) {
  //   Project.find(function (err, projects) {
  //     res.json(projects);
  //   });
  // },
  async getAll(req, res) {
    Project.find(function (err, projects) {
      if (err) {
        console.error(err);
        res.status(500).send("Error getting projects");
        return;
      }

      projects.forEach(async (project) => {
        if (project.fundGoalProgress >= project.fundGoal) {
          await Project.findByIdAndUpdate(
            project._id,
            { status: true },
            { useFindAndModify: false }
          );
        }
      });

      res.json(projects);
    });
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
        return res
          .status(400)
          .json({ message: "User already liked this project" });
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
        return res
          .status(400)
          .json({ message: "User already disliked this project" });
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
  async addComment(req, res) {
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
  //add rating
  // async addRating(req, res)  {
  //   try {
  //     const { projectId } = req.params;
  //     const project = await Project.findById(projectId);
  //     if (!project) throw new Error("Project not found");

  //     const rating = req.body.rating;
  //     if (!rating || rating < 1 || rating > 5)
  //       throw new Error("Invalid rating value");

  //     if (!project.ratings) {
  //       project.ratings = [];
  //     }
  //     project.ratings.push(rating);
  //     const totalRatings = project.ratings.length;
  //     const ratingSum = project.ratings.reduce((sum, r) => sum + r, 0);
  //     const averageRating = ratingSum / totalRatings;

  //     project.averageRating = averageRating;
  //     await project.save();

  //     res.json(project);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(400).json({ message: err.message });
  //   }
  // } ,
  async getAllCommentsByProjectId(req, res) {
    try {
      const projectId = req.params.id;
      const project = await Project.findById(projectId).populate("comment");

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const comments = project.comment;

      res.json(comments);
    } catch (error) {
      console.error("Error while getting comments by project ID", error);
      res.status(500).json({ message: error.message });
    }
  },

  async addRating(req, res) {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);
      if (!project) throw new Error("Project not found");

      const rating = req.body.rating;
      if (!rating || rating < 1 || rating > 5)
        throw new Error("Invalid rating value");

      if (!project.ratings) {
        project.ratings = [];
      }
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
  },
  async getRecommendedProjects(req, res) {
    try {
      const projects = await Project.find({})
        .sort({ likes: -1, averageRating: -1 })
        .limit(3);
      if (projects.length === 0) {
        return res
          .status(404)
          .json({ message: "Aucun projet n'est disponible." });
      }
      res.json(projects);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },
};
