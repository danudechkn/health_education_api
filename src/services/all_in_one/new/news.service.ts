import { count } from "node:console";
import db from "../../../models/it-center/index";

export class NewService {
    static async AdvertiseNewindex(query: Record<string, any>) {
        const page = parseInt(query?.page) || 1;
        const limit = parseInt(query?.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows, count } = await db.Content.findAndCountAll({
            where: {
                category_id: 1,
            },
            include: [{
                model: db.Department,
                as: "department",
                attributes: ["id", "name"]
            }],
            attributes: [
                "id",
                "title",
                "description",
                "cover_image",
                "created_at",
            ],
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });

        return {
            data: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            }
        };
    }
    static async ActivityNewindex(query: Record<string, any>) {
        const page = parseInt(query?.page) || 1;
        const limit = parseInt(query?.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows, count } = await db.Content.findAndCountAll({
            where: {
                category_id: 2,
            },
            include: [{
                model: db.Department,
                as: "department",
                attributes: ["id", "name"]
            }],
            attributes: [
                "id",
                "title",
                "description",
                "cover_image",
                "created_at",
            ],
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });

        return {
            data: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            }
        };
    }
    static async getNewsById(id: string) {
        const item = await db.Content.findByPk(id, {
            attributes: [
                "id",
                "category_id",
                "title",
                "description",
                "cover_image",
                "media_url",
                "status",
                "view_count",
                "created_at",
            ]
        });
        if (item) {
            item.view_count = (item.view_count || 0) + 1;
            await item.save();
        }

        return item;
    }
    static async addNews(query: any) {
        const { title,
            description,
            cover_image,
            media_url,
            category_id,
            status,
            view_count = 0
        } = query;
        const data = await db.Content.create({
            title,
            description,
            cover_image,
            media_url,
            category_id,
            status,
            view_count
        });
        return data;
    }
    static async updateNews(query: any) {
        const {
            id,
            title,
            category_id,
            description,
            cover_image,
            media_url,
            status,
            view_count
        } = query;
        if (!id) {
            throw new Error("id is required");
        }
        if (!category_id) {
            throw new Error("category_id is required");
        }
        const data = await db.Content.update({
            title,
            category_id,
            description,
            cover_image,
            media_url,
            status,
            view_count
        }, { where: { id, category_id } });
        return data;
    }
}

