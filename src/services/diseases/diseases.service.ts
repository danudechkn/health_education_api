import db from "../../models/it-center/index";
import { Op } from "sequelize";

export class DiseasesService {
    // ─── LIST ALL – จัดกลุ่มตาม alphabet_group ───────────────────────────────
    static async ListDiseases(query: Record<string, any>) {
        const search: string | undefined = query?.search;
        const alphabet_group: string | undefined = query?.alphabet_group;
        const status: string | undefined = query?.status;

        const where: Record<string, any> = {};

        // filter by status (default show active = 1)
        if (status !== undefined) {
            where.status = parseInt(status);
        } else {
            where.status = 1;
        }

        // filter by alphabet group
        if (alphabet_group) {
            where.alphabet_group = alphabet_group;
        }

        // search by name_th or name_en
        if (search) {
            where[Op.or as any] = [
                { name_th: { [Op.like]: `%${search}%` } },
                { name_en: { [Op.like]: `%${search}%` } },
            ];
        }

        const rows = await db.Disease.findAll({
            where,
            attributes: ["id", "name_th", "name_en", "alphabet_group"],
            order: [
                ["alphabet_group", "ASC"],
                ["name_th", "ASC"],
            ],
        });

        // จัดกลุ่มตาม alphabet_group → [{ group, disease: [{id, name_th, name_en}] }]
        const groupMap = new Map<string, { id: number; name_th: string; name_en: string | null }[]>();
        for (const row of rows) {
            const key: string = row.alphabet_group;
            if (!groupMap.has(key)) groupMap.set(key, []);
            groupMap.get(key)!.push({
                id: row.id,
                name_th: row.name_th,
                name_en: row.name_en,
            });
        }

        const data = Array.from(groupMap.entries()).map(([group, disease]) => ({
            group,
            disease: disease.map((item) => ({
                id: item.id,
                name: (item.name_th === null || item.name_th === "") ? item.name_en : item.name_th,
            })),
        }));

        return { data };
    }

    // ─── GET ONE BY ID ─────────────────────────────────────────────────────────
    static async getDiseasesById(id: number) {
        const data = await db.Disease.findOne({
            where: { id, status: 1 },
            attributes: [
                "id",
                "name_th",
                "name_en",
                "alphabet_group",
                "tab_details",
                "tab_symptoms",
                "tab_situation",
                "tab_prevention",
                "status",
            ],
        });

        if (!data) {
            throw new Error("Disease not found");
        }

        return { data };
    }

    // ─── CREATE (single or bulk) ───────────────────────────────────────────────
    static async AddDiseases(body: Record<string, any> | Record<string, any>[]) {

        if (Array.isArray(body)) {
            const records = body.map((item, index) => {
                if (!item.alphabet_group) {
                    throw new Error(`alphabet_group is required (item index ${index})`);
                }
                return {
                    name_th: item.name_th || "",
                    name_en: item.name_en || null,
                    alphabet_group: item.alphabet_group,
                    tab_details: item.tab_details ?? null,
                    tab_symptoms: item.tab_symptoms ?? null,
                    tab_situation: item.tab_situation ?? null,
                    tab_prevention: item.tab_prevention ?? null,
                    status: item.status ?? 1,
                };
            });

            const data = await db.Disease.bulkCreate(records);
            return data;
        }

        // ─── Single insert ─────────────────────────────────────────────────────
        const {
            name_th,
            name_en,
            alphabet_group,
            tab_details,
            tab_symptoms,
            tab_situation,
            tab_prevention,
            status = 1,
        } = body as Record<string, any>;

        if (!alphabet_group) {
            throw new Error("alphabet_group is required");
        }

        const data = await db.Disease.create({
            name_th: name_th || "",
            name_en: name_en || null,
            alphabet_group,
            tab_details: tab_details ?? null,
            tab_symptoms: tab_symptoms ?? null,
            tab_situation: tab_situation ?? null,
            tab_prevention: tab_prevention ?? null,
            status,
        });

        return data;
    }

    static async updatediseases(id: number, body: Record<string, any>) {
        const disease = await db.Disease.findOne({ where: { id } });

        if (!disease) {
            throw new Error("Disease not found");
        }

        const {
            name_th,
            name_en,
            alphabet_group,
            tab_details,
            tab_symptoms,
            tab_situation,
            tab_prevention,
            status,
        } = body;

        await disease.update({
            ...(name_th !== undefined && { name_th }),
            ...(name_en !== undefined && { name_en }),
            ...(alphabet_group !== undefined && { alphabet_group }),
            ...(tab_details !== undefined && { tab_details }),
            ...(tab_symptoms !== undefined && { tab_symptoms }),
            ...(tab_situation !== undefined && { tab_situation }),
            ...(tab_prevention !== undefined && { tab_prevention }),
            ...(status !== undefined && { status }),
        });

        return { data: disease };
    }

    // ─── DELETE (soft delete – set status = 0) ─────────────────────────────────
    // static async remove(id: number) {
    //     const disease = await db.Disease.findOne({ where: { id } });

    //     if (!disease) {
    //         throw new Error("Disease not found");
    //     }

    //     await disease.update({ status: 0 });

    //     return { message: `Disease id ${id} has been deleted successfully` };
    // }
}
