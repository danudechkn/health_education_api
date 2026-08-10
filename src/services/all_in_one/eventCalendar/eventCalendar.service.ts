import db from "../../../models/it-center/index";
import { Op } from "sequelize";

export class EventCalendarService {
    // ─── LIST ALL EVENTS ───────────────────────────────────────────────────────
    static async ListEvents(query: Record<string, any>) {
        // Auto-expire events that have passed their end_date
        try {
            const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
            await db.Event.update(
                { status: false },
                {
                    where: {
                        status: true,
                        end_date: {
                            [Op.not]: null,
                            [Op.lt]: todayStr,
                        },
                    },
                }
            );
        } catch (error) {
            console.error("Auto-expiry update failed:", error);
        }

        const page = parseInt(query?.page) || 1;
        const limit = parseInt(query?.limit) || 10;
        const offset = (page - 1) * limit;

        const search: string | undefined = query?.search;
        const status: string | undefined = query?.status;

        const where: Record<string, any> = {};

        // filter by status
        if (status !== undefined) {
            where.status = status === "true" || status === "1";
        }

        // search by title or description
        if (search) {
            where[Op.or as any] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ];
        }

        const { rows, count } = await db.Event.findAndCountAll({
            where,
            limit,
            offset,
            order: [["event_date", "ASC"]],
        });

        return {
            data: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    }

    // ─── GET ONE BY ID ─────────────────────────────────────────────────────────
    static async getEventById(id: number) {
        const data = await db.Event.findOne({
            where: { id },
        });

        if (!data) {
            throw new Error("Event not found");
        }

        return { data };
    }

    // ─── CREATE (single or bulk) ───────────────────────────────────────────────
    static async AddEvent(body: Record<string, any> | Record<string, any>[]) {
        if (Array.isArray(body)) {
            const records = body.map((item, index) => {
                if (!item.title) {
                    throw new Error(`title is required (item index ${index})`);
                }
                if (!item.event_date) {
                    throw new Error(`event_date is required (item index ${index})`);
                }
                return {
                    title: item.title,
                    description: item.description ?? null,
                    event_date: item.event_date,
                    status: item.status ?? true,
                    color: item.color ?? null,
                    end_date: item.end_date ?? null,
                    event_time: item.event_time ?? null,
                    location: item.location ?? null,
                    organizer: item.organizer ?? null,
                };
            });

            const data = await db.Event.bulkCreate(records);
            return data;
        }

        // ─── Single insert ─────────────────────────────────────────────────────
        const {
            title,
            description,
            event_date,
            status = true,
            color,
            end_date,
            event_time,
            location,
            organizer,
        } = body as Record<string, any>;

        if (!title) {
            throw new Error("title is required");
        }
        if (!event_date) {
            throw new Error("event_date is required");
        }

        const data = await db.Event.create({
            title,
            description: description ?? null,
            event_date,
            status,
            color: color ?? null,
            end_date: end_date ?? null,
            event_time: event_time ?? null,
            location: location ?? null,
            organizer: organizer ?? null,
        });

        return data;
    }

    // ─── UPDATE ────────────────────────────────────────────────────────────────
    static async UpdateEvent(id: number, body: Record<string, any>) {
        const event = await db.Event.findOne({ where: { id } });

        if (!event) {
            throw new Error("Event not found");
        }

        const {
            title,
            description,
            event_date,
            status,
            color,
            end_date,
            event_time,
            location,
            organizer,
        } = body;

        await event.update({
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(event_date !== undefined && { event_date }),
            ...(status !== undefined && { status }),
            ...(color !== undefined && { color }),
            ...(end_date !== undefined && { end_date }),
            ...(event_time !== undefined && { event_time }),
            ...(location !== undefined && { location }),
            ...(organizer !== undefined && { organizer }),
        });

        return { data: event };
    }

    // ─── DELETE ────────────────────────────────────────────────────────────────
    static async DeleteEvent(id: number) {
        console.log("DeleteEvent called with ID:", id, "Type:", typeof id);
        const event = await db.Event.findOne({ where: { id } });
        console.log("Found event in DB:", event ? event.toJSON() : null);

        if (!event) {
            throw new Error("Event not found");
        }

        await event.destroy();

        return { message: "Event deleted successfully" };
    }
}
