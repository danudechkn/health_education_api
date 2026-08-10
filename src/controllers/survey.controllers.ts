import { Request, Response } from "express";
import { SurveyService } from "../services/all_in_one/survey/survey.service";

export class SurveyController {
    static async addActiveSurvey(req: Request, res: Response) {
        try {
            const data = await SurveyService.addActiveSurvey(req.body);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }

    static async getDashboardStats(req: Request, res: Response) {
        try {
            const data = await SurveyService.getDashboardStats();
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }

    static async trackVisit(req: Request, res: Response) {
        try {
            const data = await SurveyService.trackVisit(req);
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }
}