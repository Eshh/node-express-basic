const express = require("express");
const path = require("path");
// custom imports
const friendsRouter = require("./routers/friends.router");
const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
const PORT = 3000;

// middleware
app.use((req, res, next) => {
  const start = Date.now();
  next();
  // finally
  const delta = Date.now() - start;
  console.log(`${req.baseUrl}${req.url} took ${delta}ms`);
});

// json middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made from IP:${req.ip}`);
  next();
});
const static = express.static(path.join(__dirname, "static"));
app.use("/site", static);

app.get("/template/:name", (req, res) => {
  const name = req.params.name;
  res.render("index", { title: `Hare ${name}`, name: `${name}` });
});

// route handlers or end points
app.use("/friends", friendsRouter);
app.get("/hare-krishna", (req, res) => {
  const pathOfImage = path.join(__dirname, "images", "2219977.jpg");
  res.sendFile(pathOfImage);
});

app.listen(PORT, () => console.log(`listening on port no:${PORT}`));
