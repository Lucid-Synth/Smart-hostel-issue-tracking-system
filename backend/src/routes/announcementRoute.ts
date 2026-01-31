import Router from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isManagement } from '../middlewares/roleMiddleware.js';
import { createAnnouncement, getAnnouncements } from '../controllers/announcementController.js';

const router = Router();

router.post('/announcement',authenticate,isManagement,createAnnouncement);
router.get('/announcement',authenticate,getAnnouncements);

export default router;