import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class Category extends Model<
    InferAttributes<Category>,
    InferCreationAttributes<Category>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare type: "news" | "media";
    declare status: CreationOptional<boolean>;

    static associate(models: any) {
        // Define associations here if needed
    }
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "",
        },
        type: {
            type: DataTypes.ENUM("news", "media"),
            allowNull: false,
            defaultValue: "",
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: false,
    }
);

export default Category;