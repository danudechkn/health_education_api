import { count } from "node:console";
import db from "../../../models/it-center/index";

export class NewService {
    private static formatImage(item: any) {
        if (!item) return item;
        const data = item.toJSON ? item.toJSON() : item;
        if (data.cover_image !== null && data.cover_image !== undefined && data.cover_image !== '') {
            data.cover_image = `/api/public/contents/${data.id}/image`;
        } else {
            data.cover_image = null;
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

    static async InfographicsNewindex(query: Record<string, any>) {
        try {
            const page = parseInt(query?.page) || 1;
            const limit = parseInt(query?.limit) || 10;
            const offset = (page - 1) * limit;
            const health_id = query?.health_id ? parseInt(query.health_id) : undefined;
            const disease_id = query?.disease_id ? parseInt(query.disease_id) : undefined;

            const where: any = {
                category_id: 3,
            };
            if (health_id !== undefined && !isNaN(health_id)) {
                where.health_id = health_id;
            }
            if (disease_id !== undefined && !isNaN(disease_id)) {
                where.disease_id = disease_id;
            }

            const { rows, count } = await db.Content.findAndCountAll({
                where,
                include: [{
                    model: db.Department,
                    as: "department",
                    attributes: ["id", "name"]
                }],
                attributes: [
                    "id", "title", "description", "cover_image",
                    "health_id", "media_url", "created_at", "view_count", "status"
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
            throw new Error(`InfographicsNewindex Error: ${error.message}`);
        }
    }

    static async MultimediaNewindex(query: Record<string, any>) {
        try {
            const page = parseInt(query?.page) || 1;
            const limit = parseInt(query?.limit) || 10;
            const offset = (page - 1) * limit;

            const { rows, count } = await db.Content.findAndCountAll({
                where: { category_id: 4 },
                include: [{
                    model: db.Department,
                    as: "department",
                    attributes: ["id", "name"]
                }],
                attributes: [
                    "id", "title", "description", "cover_image",
                    "media_url", "created_at", "view_count", "status"
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
            throw new Error(`MultimediaNewindex Error: ${error.message}`);
        }
    }

    static async getNewsById(id: string) {
        try {
            const item = await db.Content.findByPk(id, {
                attributes: [
                    "id", "category_id", "title", "description",
                    "cover_image", "media_url", "health_id", "status",
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
            const { title, description, cover_image, media_url, category_id, health_id, disease_id, status, view_count = 0 } = query;

            let parsed_cover_image = cover_image;
            if (cover_image && typeof cover_image === 'string') {
                const base64Data = cover_image.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                parsed_cover_image = Buffer.from(base64Data, 'base64');
            }

            const data = await db.Content.create({
                title, description, cover_image: parsed_cover_image,
                media_url, category_id, health_id, disease_id, status, view_count
            });
            return this.formatImage(data);
        } catch (error: any) {
            throw new Error(`addNews Error: ${error.message}`);
        }
    }

    static async updateNews(query: any) {
        try {
            const { id, title, category_id, description, cover_image, media_url, health_id, disease_id, status, view_count } = query;
            if (!id) throw new Error("id is required");
            if (!category_id) throw new Error("category_id is required");

            const updatePayload: any = {
                title,
                category_id,
                description,
                media_url,
                health_id,
                disease_id,
                status,
                view_count
            };

            if (cover_image !== undefined) {
                if (typeof cover_image === 'string') {
                    if (cover_image.startsWith('/api/public/')) {
                        // Keep the existing image
                    } else if (cover_image === '') {
                        updatePayload.cover_image = null;
                    } else {
                        // Decode new base64
                        const base64Data = cover_image.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                        updatePayload.cover_image = Buffer.from(base64Data, 'base64');
                    }
                } else {
                    updatePayload.cover_image = cover_image;
                }
            }

            const data = await db.Content.update(updatePayload, { where: { id, category_id } });
            return data;
        } catch (error: any) {
            throw new Error(`updateNews Error: ${error.message}`);
        }
    }

    static async deleteNews(id: number) {
        try {
            const item = await db.Content.findOne({ where: { id } });
            if (!item) {
                throw new Error("Content not found");
            }
            await item.destroy();
            return { message: "Content deleted successfully" };
        } catch (error: any) {
            throw new Error(`deleteNews Error: ${error.message}`);
        }
    }

    static async getCategories() {
        try {
            const data = await db.Category.findAll({
                attributes: ["id", "name", "type", "status"]
            });
            return data;
        } catch (error: any) {
            throw new Error(`getCategories Error: ${error.message}`);
        }
    }

    static async getHealthCategories() {
        try {
            const data = await db.HealthCategory.findAll({
                attributes: ["id", "name", "type", "status"]
            });
            return data;
        } catch (error: any) {
            throw new Error(`getHealthCategories Error: ${error.message}`);
        }
    }
}

