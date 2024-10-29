import express from "express";
import { getAdminJob, getAllJobs, getJobByid, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/postJob").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobByid);
router.route("/getadminJob").get(isAuthenticated, getAdminJob);

export default router;

