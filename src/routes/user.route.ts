import { Router } from "express";

import { NewsController } from "../controllers/news.controller";
import { SurveyController } from "../controllers/survey.controllers";
import { DiseasesController } from "../controllers/diseases.Controller";
import { DepartmentController } from "../controllers/department.Controller";
import { EventCalendarController } from "../controllers/eventCalendar.controller";
const router = Router();
// const apiLogger = require("../middleware/apiLogger");
// const {
//   authenticateToken,
//   authorizeRole,
// } = require("../middleware/authMiddleware");

//route
// router.use(authenticateToken, apiLogger, authorizeRole(1));

// router.get("/mapAll", AllChoiceController.mapAll);

// News
router.get("/news", NewsController.ActivityNewindex);
router.get("/advertise", NewsController.AdvertiseNewindex);
router.get("/infographics", NewsController.InfographicsNewindex);
router.get("/multimedia", NewsController.MultimediaNewindex);
router.get("/news/:id", NewsController.getNewsById);
router.post("/add-news", NewsController.addnews);
router.put("/update-news/:id", NewsController.updateNews);
router.delete("/news/:id", NewsController.deleteNews);
router.get("/categories", NewsController.getCategories);
router.get("/health-categories", NewsController.getHealthCategories);
router.get("/banner-config", NewsController.getBannerConfig);
router.put("/banner-config", NewsController.updateBannerConfig);

// Survey
router.post("/add-active-survey", SurveyController.addActiveSurvey);
router.get("/dashboard-stats", SurveyController.getDashboardStats);
router.post("/track-visit", SurveyController.trackVisit);

// Event Calendar
router.get("/event-calendars", EventCalendarController.ListEvents);
router.get("/event-calendars/:id", EventCalendarController.getEventById);
router.post("/add-event-calendar", EventCalendarController.AddEvent);
router.put("/update-event-calendar/:id", EventCalendarController.UpdateEvent);
router.delete("/event-calendars/:id", EventCalendarController.DeleteEvent);

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
