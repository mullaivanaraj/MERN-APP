const asyncHandler = require('express-async-handler');  
const generateToken = require('../config/generateToken');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body

  if(!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields')
  }

  const userExists = await User.findOne({ email })
    if(userExists) {
      res.status(400);
      throw new Error('User already exists')
    }
    const user = await User.create({ name, email, password, picture })

    if(user){
      res.status(201);
      res.json({
        _id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        token: generateToken(user._id)

      })
    } else {
      res.status(500);
      throw new Error('failed to create user')
    }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email})

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      token: generateToken(user._id)
    });
  } 
  
  else {
    res.status(401);
    throw new Error('Invalid credentials')
  }

});

module.exports = { registerUser, authUser };