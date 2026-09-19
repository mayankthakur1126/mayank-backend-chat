import User from '../models/user.model.js';

// CREATE USER
const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

// GET ALL USERS
const getAllUsers = async () => {
  const users = await User.findAll()
  return users;
};


export {
  createUser,
  getAllUsers,
};