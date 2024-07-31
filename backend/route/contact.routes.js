// contact.routes.js
import express from 'express';
import { createContactMessage, getAllContacts, getSingleContact, deleteContact } from '../controlller/contack.controller.js';
import { protectRoutes } from '../midleware/protectRoutes.js'; // Ensure correct path

const router = express.Router();

router.post('/',  createContactMessage); // Updated path
router.get('/',  getAllContacts);
router.get('/:id',  getSingleContact); // Add protectRoutes middleware
router.delete('/:id', deleteContact); // Add protectRoutes middleware

export default router;
