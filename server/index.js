const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/jobpostform", (req, res) => {
  const { jobTitle, companyName, skills } = req.body;

  const newUserData = {
    jobTitle,
    companyName,
    skills: skills.split(",").map((skill) => skill.trim()), // Convert skills to an array
  };

  // Read existing data
  let userData = [];
  const filePath = path.join(__dirname, "userData.json");

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    userData = JSON.parse(fileData);
  }

  // Add new data
  userData.push(newUserData);

  // Write updated data back to file
  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

  res.status(200).json({
    msg: "success",
  });
});

app.listen(3000, () => {
  console.log(`Server is listening is ${port}...`);
});
