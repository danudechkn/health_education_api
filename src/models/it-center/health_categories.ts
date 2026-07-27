import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class HealthCategory extends Model<
    InferAttributes<HealthCategory>,
    InferCreationAttributes<HealthCategory>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare type: CreationOptional<string | null>;
    declare status: CreationOptional<number | null>;

    static associate(models: any) {
        // Define associations here if needed
    }
}

HealthCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "",
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: "news",
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: "health_categories",
        timestamps: false,
    }
);

export default HealthCategory;
