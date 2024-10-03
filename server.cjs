const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

const dbFilePath = path.join(__dirname, "db.json");

let db = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));


app.get("/profiles", (req, res) => {
  res.json(db.profiles);
});


app.get("/items", (req, res) => {
  res.json(db.items);
});

app.get("/categories", (req, res) => {
  res.json(db.categories);
});


// app.post("/posts", (req, res) => {
//   const newPost = {
//     id: db.posts.length + 1,
//     ...req.body,
//   };
//   db.posts.push(newPost);
//   fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
//   res.status(201).json(newPost);
// });


// app.post("/comments", (req, res) => {
//   const newComment = {
//     id: db.comments.length + 1,
//     ...req.body,
//   };
//   db.comments.push(newComment);
//   fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
//   res.status(201).json(newComment);
// });


app.get("*", (req, res) => {
  res.status(404).send("Endpoint not found");
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
