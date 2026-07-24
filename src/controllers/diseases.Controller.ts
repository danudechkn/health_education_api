import { Request, Response, NextFunction } from "express";
import { DiseasesService } from "../services/all_in_one/diseases/diseases.service";
export class DiseasesController {
    static async ListDiseases(req: Request, res: Response) {
        try {
            const data = await DiseasesService.ListDiseases(req.query);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }
    static async getDiseasesById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await DiseasesService.getDiseasesById(Number(id));
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(404).json({ success: false, message: error.message || error, data: null });
        }
    }
    static async AddDiseases(req: Request, res: Response) {
        try {
            const data = await DiseasesService.AddDiseases(req.body);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }
}