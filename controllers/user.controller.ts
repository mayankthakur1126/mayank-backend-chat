import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers
} from '../services/user.service.js';

const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    const user = await createUser({
      name,
      email,
      password
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });

  } catch (error: unknown) {
    const message = error instanceof Error
      ? error.message
      : 'Something went wrong';

    return res.status(500).json({
      success: false,
      message
    });
  }
};

// GET ALL USERS
const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error: unknown) {
    const message = error instanceof Error
      ? error.message
      : 'Something went wrong';

    return res.status(500).json({
      success: false,
      message
    });
  }
};

export {
  create,
  getAll
};