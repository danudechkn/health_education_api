import { Request, Response, NextFunction } from "express";
import { NewService } from "../services/all_in_one/new/news.service";
import db from "../models/it-center/index";
export class NewsController {
    static async getNewsById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await NewService.getNewsById(id as string);
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(404).json({ success: false, message: error.message || error, data: null });
        }
    }
    static async ActivityNewindex(req: Request, res: Response) {
        try {
            const data = await NewService.ActivityNewindex(req.query);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error, data: null });
        }
    }
    static async AdvertiseNewindex(req: Request, res: Response) {
        try {
            const data = await NewService.AdvertiseNewindex(req.query);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error, data: null });
        }
    }
    static async InfographicsNewindex(req: Request, res: Response) {
        try {
            const data = await NewService.InfographicsNewindex(req.query);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || error, data: null });
        }
    }
    static async MultimediaNewindex(req: Request, res: Response) {
        try {
            const data = await NewService.MultimediaNewindex(req.query);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || error, data: null });
        }
    }
    static async addnews(req: Request, res: Response) {
        try {
            const data = await NewService.addNews(req.body);
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }
    static async updateNews(req: Request, res: Response) {
        try {
            const data = await NewService.updateNews(req.body);
            res.status(200).json({ success: true, updatedRows: data[0] });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }
    static async getContentImage(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = await db.Content.findByPk(id, {
                attributes: ["cover_image"]
            });
            if (!item || !item.cover_image) {
                res.status(404).send("Image not found");
                return;
            }
            res.setHeader("Content-Type", "image/jpeg");
            res.send(item.cover_image);
        } catch (error: any) {
            res.status(500).send(error.message || String(error));
        }
    }
    static async getCategories(req: Request, res: Response) {
        try {
            const data = await NewService.getCategories();
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || error, data: null });
        }
    }
    static async getHealthCategories(req: Request, res: Response) {
        try {
            const data = await NewService.getHealthCategories();
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || error, data: null });
        }
    }
}

