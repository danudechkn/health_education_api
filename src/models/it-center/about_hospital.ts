import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class AboutHospital extends Model<
    InferAttributes<AboutHospital>,
    InferCreationAttributes<AboutHospital>
> {
    declare id: CreationOptional<number>;
    declare vision: string | null;
    declare org_chart_image: string | null;
    declare updated_at: CreationOptional<Date | null>;

    static associate(models: any) {
        // Define associations here if needed
    }
}

AboutHospital.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vision: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        org_chart_image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "about_hospital",
        timestamps: true,
        createdAt: false, // Disables createdAt since schema only specifies updated_at
        updatedAt: "updated_at", // Maps Sequelize's automatic updatedAt to updated_at
    }
);

export default AboutHospital;