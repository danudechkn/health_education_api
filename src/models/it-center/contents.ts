import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class Content extends Model<
    InferAttributes<Content>,
    InferCreationAttributes<Content>
> {
    declare id: CreationOptional<number>;
    declare category_id: number;
    declare disease_id: number | null;
    declare health_id: number | null;
    declare department_id: number | null;
    declare title: string;
    declare description: string | null;
    declare cover_image: Buffer | string | null;
    declare media_url: string | null;
    declare status: CreationOptional<boolean | null>;
    declare view_count: CreationOptional<number | null>;
    declare created_at: CreationOptional<Date | null>;
    declare updated_at: CreationOptional<Date | null>;

    static associate(models: any) {
        // Define associations here (e.g., Category, Disease)
    }
}

Content.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        disease_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        health_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        cover_image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        media_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN, // Maps to tinyint(1)
            allowNull: true,
            defaultValue: 1,
        },
        view_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "contents", // Update table name as necessary
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Content;