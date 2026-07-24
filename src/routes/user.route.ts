import { Router } from "express";

import { AllInOneController } from "../controllers/all_in_one/allInOne.controller";
import { NewsController } from "../controllers/news.controller";
import { SurveyController } from "../controllers/survey.controllers";
import { DiseasesController } from "../controllers/diseases.Controller";
import { DepartmentController } from "../controllers/department.Controller";
const router = Router();
// const apiLogger = require("../middleware/apiLogger");
// const {
//   authenticateToken,
//   authorizeRole,
// } = require("../middleware/authMiddleware");

//route
// router.use(authenticateToken, apiLogger, authorizeRole(1));

// router.get("/mapAll", AllChoiceController.mapAll);
router.get("/all-in-one", AllInOneController.index);

// News
router.use("/news", NewsController.ActivityNewindex);
router.use("/advertise", NewsController.AdvertiseNewindex);
router.get("/news/:id", NewsController.getNewsById);
router.post("/add-news", NewsController.addnews);
router.put("/update-news", NewsController.updateNews);

// Survey
router.post("/add-active-survey", SurveyController.addActiveSurvey);

// Diseases
router.get("/diseases", DiseasesController.ListDiseases);
router.get("/diseases/:id", DiseasesController.getDiseasesById);
router.post("/add-diseases", DiseasesController.AddDiseases);
router.put("/update-diseases/:id", DiseasesController.updatediseases);

// Department
router.get("/departments", DepartmentController.ListDepartment);
// router.get("/department/:id", DepartmentController.getDepartmentById);
// router.post("/add-department", DepartmentController.AddDepartment);
// router.put("/update-department/:id", DepartmentController.updateDepartment);



export default router;
