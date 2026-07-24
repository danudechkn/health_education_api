import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class Disease extends Model<
    InferAttributes<Disease>,
    InferCreationAttributes<Disease>
> {
    declare id: CreationOptional<number>;
    declare name_th: string;
    declare name_en: string | null;
    declare alphabet_group: string;
    declare tab_details: string | null;
    declare tab_symptoms: string | null;
    declare tab_situation: string | null;
    declare tab_prevention: string | null;
    declare status: CreationOptional<boolean | null>;
    declare created_at: CreationOptional<Date | null>;
    declare updated_at: CreationOptional<Date | null>;

    static associate(models: any) {
        // Define associations here (e.g., Article.hasMany(models.Disease))
    }
}

Disease.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name_th: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        name_en: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        alphabet_group: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        tab_details: {
            type: DataTypes.TEXT("long"), // Maps to longtext in MySQL
            allowNull: true,
        },
        tab_symptoms: {
            type: DataTypes.TEXT("long"),
            allowNull: true,
        },
        tab_situation: {
            type: DataTypes.TEXT("long"),
            allowNull: true,
        },
        tab_prevention: {
            type: DataTypes.TEXT("long"),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
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
        tableName: "diseases", // Adjust table name if needed
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Disease;