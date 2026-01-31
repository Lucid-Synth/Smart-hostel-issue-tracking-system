import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isManagement, isStudent } from "../middlewares/roleMiddleware.js";
import addIssues, { getIssueById, getIssues, getMyIssue } from "../controllers/issueController.js";

const router = Router();

router.post('/issues',authenticate,isStudent,addIssues);
router.get('/issues',authenticate,isManagement,getIssues);
router.get('/issue',authenticate,isStudent,getMyIssue);
router.get('/issue/:issueId',authenticate,getIssueById);


export default router;