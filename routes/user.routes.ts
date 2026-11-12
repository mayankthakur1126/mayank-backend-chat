import express from 'express';

import {
  create,
  getAll,
} from '../controllers/user.controller.js';
import { listUserChats } from "../controllers/chat.controller"
const router = express.Router();

// CREATE
router.post('/create', create);

// READ ALL
router.get('/', getAll);

router.get("/:userId/chats", listUserChats);

export default router;