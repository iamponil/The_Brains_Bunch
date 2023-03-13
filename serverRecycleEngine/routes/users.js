var express = require("express");
var router = express.Router();
var UserController = require("../controller/user-controller");
const storage = require("../middleware/storage");

//Get All Users
router.get("/getAll", UserController.getAll);

// get All Clients

router.get("/getAllClients", UserController.getAllClients);

//Add new Users
router.post("/addUser", storage.upload_file('image') ,UserController.addUser);

//Get one Users By _id
router.get("/oneById/:id", UserController.getById);

//Get one Users By FirstName
router.get("/oneByName/:name", UserController.getByName);

//delete one product by _id
router.delete(
  "/deleteOne/:id",
  UserController.getOneById,
  UserController.delete
);

//delete All Users
router.delete("/deleteAll", UserController.deleteAll);

//update User
router.patch(
  "/updateOne/:id",
  UserController.getOneById,
  UserController.updateUser
);
module.exports = router;
