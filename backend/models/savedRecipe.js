import { DataTypes } from "sequelize";

const SavedRecipeModel = (sequelize) => {
    const SavedRecipe = sequelize.define("SavedRecipe", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED, 
            autoIncrement: true,
            primaryKey: true,
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
        recipeId: {
            type: DataTypes.BIGINT.UNSIGNED, 
            allowNull: false,
            references: {
                model: "recipes",
                key: "id",
            },
            onDelete: "CASCADE",
        },
    }, {
        tableName: "saved_recipes",
        timestamps: true,
    });

    return SavedRecipe;
};

export default SavedRecipeModel;