const express = require(`express`);

const app = express();
const PORT = 3000;

let friends = [
  { name: "Juveriya Mehreen", age: 20, location: "Visakhapatnam" },
  { name: "Lokesh", age: 23, location: "Kerala" },
  { name: "Krishna", age: 27, location: "Srikakulam" },
];

// middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(req.url, req.method);
  next();
  // finally
  const delta = Date.now() - start;
  console.log(`${delta}ms`);
});

app.use(express.json());

//endpoints
app.get("/friends/:name", (req, res) => {
  const friend = friends.filter((e) => e.name == req.params.name);
  console.log(friends, friend, req.params.name);
  if (friend.length > 0) res.status(200).json(friend);
  else res.status(404).json({ error: "No user found" });
});

app.post("/add/friend", (req, res) => {
  const { name, age, location } = req.body;
  console.log(req.body);
  if (!!req.body.name) {
    friends.push({ name, age, location });
    return res.json("Friend succesfully added");
  } else res.status(400).json({ error: "Invalid request" });
});

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/messages", (req, res) => console.log(res));

// port allocation
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
