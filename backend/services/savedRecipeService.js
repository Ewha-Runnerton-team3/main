import SavedRecipeModel from "../models/SavedRecipeModel.js";
import RecipeModel from "../models/RecipeModel.js"; 

export async function saveRecipe(sequelize, userId, recipeData) {
    try {
        const Recipe = RecipeModel(sequelize);
        const SavedRecipe = SavedRecipeModel(sequelize);

        // 레시피가 DB에 있는지 확인
        let existingRecipe = await Recipe.findOne({ where: { title: recipeData.title } });

        if (!existingRecipe) {
            // 존재하지 않으면 새로 저장
            existingRecipe = await Recipe.create({
                title: recipeData.title,
                thumbnail: recipeData.thumbnail || null,
                finalImage: recipeData.finalImage || null,
                servingSize: recipeData.servingSize,
                cookingTime: recipeData.cookingTime,
                difficulty: recipeData.difficulty,
                ingredients: JSON.stringify(recipeData.ingredients),
                steps: JSON.stringify(recipeData.steps)
            });
        }

        // 이미 저장된 레시피인지 확인 (중복 저장 방지)
        const existingSavedRecipe = await SavedRecipe.findOne({
            where: { userId, recipeId: existingRecipe.id },
        });

        if (existingSavedRecipe) {
            return { success: false, message: "이미 즐겨찾기에 추가된 레시피입니다.", recipeId: existingRecipe.id };
        }

        // 사용자가 저장한 레시피 추가 (즐겨찾기 등록)
        await SavedRecipe.create({ userId, recipeId: existingRecipe.id });

        return { success: true, message: "레시피가 즐겨찾기에 저장되었습니다.", recipeId: existingRecipe.id };
    } catch (error) {
        console.error("레시피 저장 오류:", error);
        return { success: false, message: "레시피 저장 중 오류 발생" };
    }
}

export async function getSavedRecipes(sequelize, userId) {
    try {
        const SavedRecipe = SavedRecipeModel(sequelize);
        const Recipe = RecipeModel(sequelize);

        // 사용자 ID로 저장된 레시피 목록 가져오기 
        const savedRecipes = await SavedRecipe.findAll({
            where: { userId },
            include: [
                {
                    model: Recipe,
                    as: "recipe",
                    attributes: [
                        "id",
                        "title",
                        "thumbnail",
                        "finalImage",
                        "servingSize",
                        "cookingTime",
                        "difficulty",
                        "ingredients",
                        "steps",
                        "createdAt",
                    ],
                },
            ],
        });

        return savedRecipes.map((savedRecipe) => ({
            id: savedRecipe.recipe.id,
            title: savedRecipe.recipe.title,
            thumbnail: savedRecipe.recipe.thumbnail,
            finalImage: savedRecipe.recipe.finalImage,
            servingSize: savedRecipe.recipe.servingSize,
            cookingTime: savedRecipe.recipe.cookingTime,
            difficulty: savedRecipe.recipe.difficulty,
            ingredients: JSON.parse(savedRecipe.recipe.ingredients), // JSON 변환
            steps: JSON.parse(savedRecipe.recipe.steps), // JSON 변환
            createdAt: savedRecipe.recipe.createdAt,
        }));
    } catch (error) {
        console.error("저장된 레시피 조회 오류:", error);
        return [];
    }
}

export async function deleteSavedRecipe(sequelize, userId, recipeId) {
    try {
        const SavedRecipe = SavedRecipeModel(sequelize);

        const deletedRowCount = await SavedRecipe.destroy({
            where: { userId, recipeId },
        });

        if (deletedRowCount === 0) {
            return { success: false, message: "삭제할 레시피가 없습니다." };
        }

        return { success: true, message: "레시피가 삭제되었습니다." };
    } catch (error) {
        console.error("저장된 레시피 삭제 오류:", error);
        return { success: false, message: "레시피 삭제 중 오류 발생" };
    }
}
