const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Helper function to read users from the JSON file
const readUsersFromFile = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();

  // Check if the user already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).send({ message: 'User already exists' });
  }

  // Save the new user
  users.push({ email, password });
  writeUsersToFile(users);

  console.log('User signed up with email:', email);
  res.status(201).send({ message: 'User created' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();

  // Check if the user exists and the password matches
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).send({ message: 'Invalid email or password' });
  }

  console.log('User logged in with email:', email);
  res.status(200).send({ message: 'User authenticated' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
