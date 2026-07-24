import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "./index";

class VisitorLog extends Model<
    InferCreationAttributes<VisitorLog>,
    InferAttributes<VisitorLog>> {
    declare id: CreationOptional<number>;
    declare ip_address: string;
    declare visit_date: Date | string;
    declare created_at: CreationOptional<Date | null>;
}
VisitorLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ip_address: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        visit_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "visitors_log",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
)
export default VisitorLog;