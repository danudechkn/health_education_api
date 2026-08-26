import { Request, Response } from "express";
import { DepartmentService } from "../services/department/department.service";
export class DepartmentController {
    static async ListDepartment(req: Request, res: Response) {
        try {
            const data = await DepartmentService.ListDepartment(req.query);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }
}   