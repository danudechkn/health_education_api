import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class UsersAdmin extends Model<
    InferAttributes<UsersAdmin>,
    InferCreationAttributes<UsersAdmin>
> {
    declare id: CreationOptional<number>;
    declare user_name: string | null;
    declare password: string | null;
    declare name: string | null;

    static associate(models: any) {
        // Define associations here if needed
    }
}

UsersAdmin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "users_admin",
        timestamps: false,
    }
);

export default UsersAdmin;