const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const usersDatabase = [ {  id: 1,  name: "Ali Hassan", email: "admin@gmail.com",
    // Pre-hashed version of "123456"
    password: "$2a$10$X72D/KbeXWw9bthQv06V4eI6RGoP38wV3J7uWKej9Iym8m2D15mK6",
    role: "Customer",
    createdAt: new Date(), }];

//  SIGN UP / REGISTER FUNCTION
const registerUser = async (req, res) => {  const { name, email, password } =req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" }); }

  // Check if user already exists
  const userExists = usersDatabase.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists with this email" });  }
  try {
    // Securely hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {  id: usersDatabase.length + 1,  name,  email, password: hashedPassword, role: "Customer", createdAt: new Date() };
    usersDatabase.push(newUser);
    return res.status(201).json({
      token: generateToken(newUser.id),
      user: {  id: newUser.id,  name: newUser.name, email: newUser.email,   role: newUser.role,  createdAt: newUser.createdAt  } });  } catch (error) {
    return res.status(500).json({ message: "Server error during registration" });  }};

//  LOGIN FUNCTION
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = usersDatabase.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });  }
  return res.status(200).json({
    token: generateToken(user.id),
    user: {  id: user.id, name: user.name,  email: user.email, role: user.role, createdAt: user.createdAt  }});};

// GET PROFILE FUNCTION
const getProfile = (req, res) => {
  const user = usersDatabase.find(u => u.id === req.user.id);
  if (!user) {  return res.status(404).json({ message: "User not found" });  }
  res.json({
    user: {  id: user.id,  name: user.name,  email: user.email, role: user.role, createdAt: user.createdAt  } });};

// Export all three handlers 
module.exports = {  loginUser,registerUser,  getProfile,};