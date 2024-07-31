
import express from 'express';
import { startStream,getCurrentLiveVideo, stopStream,joinStream,leaveStream,changeVideoQuality } from '../controlller/livevideo.controller.js';
import { protectRoutes } from '../midleware/protectRoutes.js';

const router = express.Router();

router.post('/start', startStream);

router.get('/stop', stopStream);

router.get('/', getCurrentLiveVideo);
router.get('/join', joinStream);
router.get('/leave', leaveStream);

router.put('/quality', protectRoutes, changeVideoQuality);

export default router;
