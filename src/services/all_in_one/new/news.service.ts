import { count } from "node:console";
import db from "../../../models/it-center/index";

export class NewService {
    private static formatImage(item: any) {
        if (!item) return item;
        const data = item.toJSON ? item.toJSON() : item;
        if (data.cover_image && Buffer.isBuffer(data.cover_image)) {
            data.cover_image = `data:image/jpeg;base64,${data.cover_image.toString('base64')}`;
        }
        return data;
    }

    static async AdvertiseNewindex(query: Record<string, any>) {
        try {
            const page = parseInt(query?.page) || 1;
            const limit = parseInt(query?.limit) || 12;
            const offset = (page - 1) * limit;

            const { rows, count } = await db.Content.findAndCountAll({
                where: { category_id: 1 },
                include: [{
                    model: db.Department,
                    as: "department",
                    attributes: ["id", "name"]
                }],
                attributes: [
                    "id", "title", "description", "cover_image",
                    "created_at", "view_count", "status"
                ],
                limit,
                offset,
                order: [["created_at", "DESC"]],
            });

            return {
                data: rows.map((row: any) => this.formatImage(row)),
                pagination: {
                    page,
                    limit,
                    total: count,
                    totalPages: Math.ceil(count / limit),
                }
            };
        } catch (error: any) {
            throw new Error(`AdvertiseNewindex Error: ${error.message}`);
        }
    }

    static async ActivityNewindex(query: Record<string, any>) {
        try {
            const page = parseInt(query?.page) || 1;
            const limit = parseInt(query?.limit) || 12;
            const offset = (page - 1) * limit;

            const { rows, count } = await db.Content.findAndCountAll({
                where: { category_id: 2 },
                include: [{
                    model: db.Department,
                    as: "department",
                    attributes: ["id", "name"]
                }],
                attributes: [
                    "id", "title", "description", "cover_image",
                    "created_at", "view_count", "status"
                ],
                limit,
                offset,
                order: [["created_at", "DESC"]],
            });

            return {
                data: rows.map((row: any) => this.formatImage(row)),
                pagination: {
                    page,
                    limit,
                    total: count,
                    totalPages: Math.ceil(count / limit),
                }
            };
        } catch (error: any) {
            throw new Error(`ActivityNewindex Error: ${error.message}`);
        }
    }

    static async getNewsById(id: string) {
        try {
            const item = await db.Content.findByPk(id, {
                attributes: [
                    "id", "category_id", "title", "description",
                    "cover_image", "media_url", "status",
                    "view_count", "created_at",
                ]
            });
            if (item) {
                item.view_count = (item.view_count || 0) + 1;
                await item.save();
            }
            return this.formatImage(item);
        } catch (error: any) {
            throw new Error(`getNewsById Error: ${error.message}`);
        }
    }

    static async addNews(query: any) {
        try {
            const { title, description, cover_image, media_url, category_id, status, view_count = 0 } = query;

            let parsed_cover_image = cover_image;
            if (cover_image && typeof cover_image === 'string') {
                const base64Data = cover_image.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                parsed_cover_image = Buffer.from(base64Data, 'base64');
            }

            const data = await db.Content.create({
                title, description, cover_image: parsed_cover_image,
                media_url, category_id, status, view_count
            });
            return this.formatImage(data);
        } catch (error: any) {
            throw new Error(`addNews Error: ${error.message}`);
        }
    }

    static async updateNews(query: any) {
        try {
            const { id, title, category_id, description, cover_image, media_url, status, view_count } = query;
            if (!id) throw new Error("id is required");
            if (!category_id) throw new Error("category_id is required");

            let parsed_cover_image = cover_image;
            if (cover_image && typeof cover_image === 'string') {
                const base64Data = cover_image.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                parsed_cover_image = Buffer.from(base64Data, 'base64');
            }

            const data = await db.Content.update({
                title, category_id, description, cover_image: parsed_cover_image,
                media_url, status, view_count
            }, { where: { id, category_id } });
            return data;
        } catch (error: any) {
            throw new Error(`updateNews Error: ${error.message}`);
        }
    }
}

