import { createSidebarReview} from "../controlller/sidebarnewscoment.controller.js";
import express from 'express';
import { protectRoutes } from '../midleware/protectRoutes.js';

const router = express.Router();
 
// SidebarNews için review oluşturma
router.post('/:sidebarnewsId/review',protectRoutes, createSidebarReview);
export default router;
