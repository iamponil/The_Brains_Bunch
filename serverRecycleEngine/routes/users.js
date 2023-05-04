var express = require("express");
var router = express.Router();
var UserController = require("../controller/user-controller");
const storage = require("../middleware/storage");

const authenticateToken = require("../middleware/authorize");

//Get All Users
router.get("/", UserController.getAllUsers);
router.get("/getAll", UserController.getAll);

// get All Clients

router.get("/getAllClients", UserController.getAllClients);

//Add new Users
router.post("/addUser", storage.upload_file("image"), UserController.addUser);

//Get one Users By _id
// router.get("/oneById/:id", UserController.getById);

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
//reset password
router.post("/resetPassword", UserController.resetPassword);
//check secret code
router.post("/CheckSecretCode", UserController.checkSecretCode);
//update password
router.put("/resetNewPassword/:id", UserController.resetNewPassword);
router.post("/addUser1", storage.upload_file("image"), UserController.addUser1);
router.post("/activation", UserController.activateEmail);
//Get one Users By _id
router.get("/getUserById/:id", UserController.getById);
//Update Status User
router.put("/Bloque/:id",UserController.Bloquage);
//Update user By id 
router.post("/updateUser/:id", storage.upload_file("image"),UserController.UpdateUserById);
router.post(
  "/updateUser/",
  authenticateToken,
  storage.upload_file("image"),
  UserController.UpdateUserById
);
module.exports = router;
router.post(
  "/addUserAddress/",
  authenticateToken,
  UserController.addUserAddress
);
router.get(
  "/getUserAddress/",
  authenticateToken,
  UserController.getUserAddress
);
router.get(
  "/getOneByPayloadId",
  authenticateToken,
  UserController.getByPayloadId
);
router.get(
  "/getUserAddress/",
  authenticateToken,
  UserController.getUserAddress
);
router.post(
  "/updateUserPassword/",
  authenticateToken,
  UserController.updateUserPassword
);
router.post(
  "/send-email",
  UserController.SendContactMail
)