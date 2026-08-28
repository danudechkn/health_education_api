import { Router } from "express";

import { NewsController } from "../controllers/news.controller";
import { SurveyController } from "../controllers/survey.controllers";
import { DiseasesController } from "../controllers/diseases.Controller";
import { DepartmentController } from "../controllers/department.Controller";
import { EventCalendarController } from "../controllers/eventCalendar.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

//route
// router.use(authenticateToken, apiLogger, authorizeRole(1));

// router.get("/mapAll", AllChoiceController.mapAll);

// News
router.get("/news", NewsController.ActivityNewindex);
router.get("/advertise", NewsController.AdvertiseNewindex);
router.get("/infographics", NewsController.InfographicsNewindex);
router.get("/multimedia", NewsController.MultimediaNewindex);
router.get("/news/:id", NewsController.getNewsById);
router.post("/add-news", authenticateToken, NewsController.addnews);
router.put("/update-news/:id", authenticateToken, NewsController.updateNews);
router.delete("/news/:id", authenticateToken, NewsController.deleteNews);
router.get("/categories", NewsController.getCategories);
router.get("/health-categories", NewsController.getHealthCategories);
router.get("/banner-config", NewsController.getBannerConfig);
router.put("/banner-config", authenticateToken, NewsController.updateBannerConfig);

// Survey
router.post("/add-active-survey", SurveyController.addActiveSurvey);
router.get("/dashboard-stats", SurveyController.getDashboardStats);
router.post("/track-visit", SurveyController.trackVisit);

// Event Calendar
router.get("/event-calendars", EventCalendarController.ListEvents);
router.get("/event-calendars/:id", EventCalendarController.getEventById);
router.post("/add-event-calendar", authenticateToken, EventCalendarController.AddEvent);
router.put("/update-event-calendar/:id", authenticateToken, EventCalendarController.UpdateEvent);
router.delete("/event-calendars/:id", authenticateToken, EventCalendarController.DeleteEvent);

// Diseases
router.get("/diseases", DiseasesController.ListDiseases);
router.get("/diseases/:id", DiseasesController.getDiseasesById);
router.post("/add-diseases", authenticateToken, DiseasesController.AddDiseases);
router.put("/update-diseases/:id", authenticateToken, DiseasesController.updatediseases);

// Department
router.get("/departments", DepartmentController.ListDepartment);

export default router;
