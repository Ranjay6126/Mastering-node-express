import express from "express";
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("./MOCK_DATA.json", "utf8"));

// initialize express first
const hat = express();

// middleware to parse request body
hat.use(express.urlencoded({ extended: false }));
hat.use(express.json()); // add this for JSON API support

const PORT = 3000;

// SERVER SIDE RENDERING (FOR PHONE USERS)
const users = data;

hat.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map(u => `<li>${u.first_name} ${u.last_name}</li>`).join('')}
    </ul>
  `;
  res.send(html);
});


// RESTFUL API (Hybrid Routes)
hat.get("/api/users", (req, res) => {
  res.json(data);
});


// POST request to create a new user
hat.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("Received Body:", body);
  res.json({ status: "not yet implemented" });
});


// GET, PATCH, DELETE using route chaining
hat.route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = data.find(u => u.id === id);
    return res.json(user);
  })

  .patch((req, res) => {
    res.json({ status: "not yet implemented" });
  })
  
  .delete((req, res) => {
    res.json({ status: "not yet implemented" });
  });

hat.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
