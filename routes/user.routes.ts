import express from 'express';

import {
  create,
  getAll,
} from '../controllers/user.controller.js';

const router = express.Router();

// CREATE
router.post('/create', create);

// READ ALL
router.get('/', getAll);

export default router;