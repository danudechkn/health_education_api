import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

class Event extends Model<
    InferAttributes<Event>,
    InferCreationAttributes<Event>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string | null;
    declare event_date: Date | string;
    declare status: CreationOptional<boolean | null>;
    declare color: string | null;
    declare end_date: Date | string | null;
    declare event_time: string | null;
    declare location: string | null;
    declare organizer: string | null;

    static associate(models: any) {
    }
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        event_date: {
            type: DataTypes.DATEONLY, // Maps strictly to DATE (YYYY-MM-DD) in MySQL
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN, // Maps to tinyint(1)
            allowNull: true,
            defaultValue: 1,
        },
        color: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        event_time: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        organizer: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "events_calendar", // Adjust table name as needed
        timestamps: false, // Disables createdAt/updatedAt as they are not in the schema
    }
);

export default Event;