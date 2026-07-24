import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class Department extends Model<
    InferAttributes<Department>,
    InferCreationAttributes<Department>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare status: CreationOptional<boolean | null>;
    declare created_at: CreationOptional<Date | null>;


    static associate(models: any) {
        // Define associations here (e.g., Article.hasMany(models.Department))
    }
}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
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
    },
    {
        sequelize,
        tableName: "departments", // Adjust table name if needed
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Department;