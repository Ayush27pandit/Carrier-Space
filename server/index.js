const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const port = 3000;
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.json());

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


// Route to handle user details submission
app.post('/api/users', (req, res) => {
  const userDetails = req.body;

  // Path to the JSON file
  const filePath = path.join(__dirname, 'userDetails.json');

  // Read the existing data
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }

    // Parse existing data or initialize an empty array
    const existingUsers = data ? JSON.parse(data) : [];

    // Add new user details to the array
    existingUsers.push(userDetails);

    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Server error');
      }
      res.status(201).send(userDetails); // Send back the saved user details
    });
  });
});


app.listen(3000, () => {
  console.log(`Server is listening is ${port}...`);
});
