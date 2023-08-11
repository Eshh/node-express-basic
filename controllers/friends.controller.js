const models = require("../models/friends.model");
let friends = models.friends;

function getFriend(req, res) {
  const friend = friends.filter((e) => e.name == req.params.name);
  if (friend.length > 0) res.status(200).json(friend);
  else res.status(404).json({ error: "No user found" });
}

function addFriend(req, res) {
  const { name, age, location } = req.body;
  if (!!req.body.name) {
    friends.push({ name, age, location });
    return res.json("Friend succesfully added");
  } else res.status(400).json({ error: "Invalid request" });
}
function getLocation(req, res) {
  if (!!req.param.name) {
    const friend = friends.filter((e) => e.name == req.params.name);
    if (friend.length > 0)
      res.status(200).json(`${friend[0].name} stays at ${friend[0].location}`);
    else
      res
        .status(400)
        .json({ error: `No user found with name ${req.params.name}` });
  }
}

module.exports = {
  getFriend,
  addFriend,
  getLocation,
};
