// video.router.js

import express from 'express';
import { createVideo, getAllVideos, getVideo, updateVideo, deleteVideo } from '../controlller/video.controller.js';
import { protectRoutes } from '../midleware/protectRoutes.js';

const router = express.Router();

router.post('/',  createVideo);
router.get('/', getAllVideos);
router.get('/:id', getVideo);
router.patch('/:id',updateVideo);
router.delete('/:id',  deleteVideo);

export default router;
