const express = require("express");

const friendsController = require("../controllers/friends.controller");

const friendsRouter = express.Router();

friendsRouter.get("/:name", friendsController.getFriend);
friendsRouter.get("/:name/location", friendsController.getLocation);
friendsRouter.post("/add", friendsController.addFriend);

module.exports = friendsRouter;
