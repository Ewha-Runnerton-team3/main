import { DataTypes } from "sequelize";

const RecipeModel = (sequelize) => {
    const Recipe = sequelize.define(
        "Recipe",
        {
            id: { 
                type: DataTypes.BIGINT.UNSIGNED, 
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: { 
                type: DataTypes.STRING,
                allowNull: false,
            },
            thumbnail: {
                type: DataTypes.STRING, 
                allowNull: true,
            },
            finalImage: {
                type: DataTypes.STRING, 
                allowNull: true,
            },
            servingSize: { 
                type: DataTypes.STRING,
                allowNull: false,
            },
            cookingTime: { 
                type: DataTypes.STRING,
                allowNull: false,
            },
            difficulty: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.TEXT,
                allowNull: false,
                get() {
                    return JSON.parse(this.getDataValue("ingredients") || "[]");
                },
                set(value) {
                    this.setDataValue("ingredients", JSON.stringify(value));
                },
            },
            steps: {
                type: DataTypes.TEXT, 
                allowNull: false,
                get() {
                    return JSON.parse(this.getDataValue("steps") || "[]");
                },
                set(value) {
                    this.setDataValue("steps", JSON.stringify(value));
                },
            },
            userId: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
        },
        {
            tableName: "recipes",
            timestamps: true,
            underscored: true, 
        }
    );

    return Recipe;
};

export default RecipeModel;
