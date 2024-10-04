const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

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


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = db.users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isPasswordCorrect = user.password === password;  

  if (!isPasswordCorrect) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
  });
});


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
