const express = require("express");
// custom imports
const friendsRouter = require("./routers/friends.router");
const app = express();
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

// route handlers or end points
app.use("/friends", friendsRouter);

app.listen(PORT, () => console.log(`listening on port no:${PORT}`));
