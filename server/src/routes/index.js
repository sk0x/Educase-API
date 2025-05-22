import { Router } from "express";
import { addNewSchool, listSchools } from "../controllers/school.controller.js";
import { listSchoolsReqSchema, newSchoolReqSchema } from "../validate/school.validate.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";

const router = Router();

// path -> request body schema -> validation middleware -> controller
router.post('/addSchool', newSchoolReqSchema, validateRequest, addNewSchool);
router.get('/listSchools', listSchoolsReqSchema, validateRequest, listSchools);

export default router;


