// routes/advertisiment.routes.js

import express from 'express';
import { addAdvertisement ,getSingleAdvertisement,deleteAdvertisement,getAllAdvertisements} from '../controlller/advertisiment.controller.js';

const router = express.Router();

// Route for creating a new advertisement
router.post('/', addAdvertisement);
router.get('/:advertisementId', async (req, res) => {
    try {
      const ad = await Advertisement.findById(req.params.advertisementId);
      if (ad) {
        res.json(ad);
      } else {
        res.status(404).json({ message: 'Advertisement not found' });
      }
    } catch (error) {
      console.error('Error fetching advertisement:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });router.get('/', getAllAdvertisements);

router.delete('/:advertisementId', deleteAdvertisement);

export default router;
