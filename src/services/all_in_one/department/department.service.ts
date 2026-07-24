import db from "../../../models/it-center/index";

export class DepartmentService {
    static async ListDepartment(query: Record<string, any>) {
        const page = parseInt(query?.page) || 1;
        const limit = parseInt(query?.limit) || 10;
        const offset = (page - 1) * limit;
        const data = await db.Department.findAndCountAll({
            attributes: [
                "id",
                "name",
            ],
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });
        return {
            data: data.rows,
        };
    }
    // static async getDepartmentById(id: number) {
    //     const item = await db.Department.findByPk(id);
    //     return item;
    // }
    // static async AddDepartment(query: any) {
    //     const { name, description } = query;
    //     const data = await db.Department.create({
    //         name,
    //         description,
    //     });
    //     return data;
    // }
    // static async updateDepartment(id: number, query: any) {
    //     const { name, description } = query;
    //     const data = await db.Department.update({
    //         name,
    //         description,
    //     }, { where: { id } });
    //     return data;
    // }
}