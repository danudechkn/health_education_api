import { Request, Response, NextFunction } from "express";
import { NewService } from "../services/all_in_one/new/news.service";
import db from "../models/it-center/index";
import fs from "fs";
import path from "path";

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
            const { id } = req.params;
            const data = await NewService.updateNews({ ...req.body, id: Number(id) });
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

    static async deleteNews(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await NewService.deleteNews(Number(id));
            res.status(200).json({ success: true, ...data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message || String(error), data: null });
        }
    }

    static async getBannerConfig(req: Request, res: Response) {
        try {
            const configPath = path.join(__dirname, "../../../config/banner.json");
            const dir = path.dirname(configPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            const defaultBanner = {
                badgeTh: "ระบบสารสนเทศด้านสุขศึกษา",
                badgeEn: "Health Education Information System",
                titleTh: "ตั้งเเต่วันที่ 1 ตุลาคม 2565 โรคโควิด-19 ปรับเป็นโรคติดต่อที่ต้องเฝ้าระวัง ตาม พ.ร.บ โรคติดต่อ พ.ศ.2558",
                titleEn: "As of October 1, 2022, COVID-19 has been reclassified as a communicable disease under surveillance, in accordance with the Communicable Diseases Act B.E. 2558 (2015)",
                subtitleTh: "ซึ่งกำหนดให้มีการรายงานโรคเป็นรายสัปดาห์ โดยเริ่มการารายงานเป็นรายสัปดาห์ครั้งเเรก วันที่ 3 ตุลาคม 2565 เป็นต้นไป",
                subtitleEn: "This mandates weekly disease reporting, commencing on October 3, 2022"
            };

            if (!fs.existsSync(configPath)) {
                fs.writeFileSync(configPath, JSON.stringify(defaultBanner, null, 4), "utf-8");
                return res.status(200).json({ success: true, data: defaultBanner });
            }

            const rawData = fs.readFileSync(configPath, "utf-8");
            const data = JSON.parse(rawData);
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message || String(error) });
        }
    }

    static async updateBannerConfig(req: Request, res: Response) {
        try {
            const configPath = path.join(__dirname, "../../../config/banner.json");
            const dir = path.dirname(configPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const updatedConfig = {
                badgeTh: req.body.badgeTh,
                badgeEn: req.body.badgeEn,
                titleTh: req.body.titleTh,
                titleEn: req.body.titleEn,
                subtitleTh: req.body.subtitleTh,
                subtitleEn: req.body.subtitleEn
            };

            fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 4), "utf-8");
            res.status(200).json({ success: true, data: updatedConfig });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message || String(error) });
        }
    }
}

