import { Request, Response } from "express";
import { EventCalendarService } from "../services/eventCalendar/eventCalendar.service";

export class EventCalendarController {
    static async ListEvents(req: Request, res: Response) {
        try {
            const data = await EventCalendarService.ListEvents(req.query);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }

    static async getEventById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await EventCalendarService.getEventById(Number(id));
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(404).json({ success: false, message: error.message || String(error), data: null });
        }
    }

    static async AddEvent(req: Request, res: Response) {
        try {
            const data = await EventCalendarService.AddEvent(req.body);
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }

    static async UpdateEvent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await EventCalendarService.UpdateEvent(Number(id), req.body);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }

    static async DeleteEvent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await EventCalendarService.DeleteEvent(Number(id));
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }
}
