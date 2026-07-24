import { Router } from "express";

import { AllInOneController } from "../controllers/all_in_one/allInOne.controller";
import { NewsController } from "../controllers/news.controller";
import { SurveyController } from "../controllers/survey.controllers";
import { DiseasesController } from "../controllers/diseases.Controller";
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
router.use("/new", NewsController.ActivityNewindex);
router.use("/advertise", NewsController.AdvertiseNewindex);
router.get("/news/:id", NewsController.getNewsById);
router.post("/addnews", NewsController.addnews);
router.put("/updatenews", NewsController.updateNews);

// Survey
router.post("/add-active-survey", SurveyController.addActiveSurvey);

// Diseases
router.get("/diseases", DiseasesController.ListDiseases);
router.get("/diseases/:id", DiseasesController.getDiseasesById);
router.post("/Adddiseases", DiseasesController.AddDiseases);





export default router;
