const express = require("express");

const app = express();

app.use(express.json());

const userRoutes = require("./src/routes/user.route");
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("API Running 🚀");
});


module.exports = app;