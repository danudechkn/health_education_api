import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class Surveys extends Model<
    InferAttributes<Surveys>,
    InferCreationAttributes<Surveys
    >
> {
    declare id: CreationOptional<number>;
    declare session_id: string;
    declare score_q1: number;
    declare score_q2: number;
    declare score_q3: number;
    declare feedback: string | null;
    declare created_at: CreationOptional<Date | null>;

    static associate(models: any) {
    }
}

Surveys.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        session_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        score_q1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score_q2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score_q3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        feedback: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "surveys", // Adjust table name as needed
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false, // Disables updatedAt since schema only specifies created_at
    }
);

export default Surveys;