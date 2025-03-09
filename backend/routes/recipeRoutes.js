import express from "express";
import { getRecipe } from "../services/recipeService.js";
import db from "../models/index.js";  


const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const { menu } = req.query;
    if (!menu) {
      return res.status(400).json({ error: "메뉴 이름을 입력하세요." });
    }

    const recipe = await getRecipe(menu);
    return res.json(recipe);
  } catch (error) {
    console.error("레시피 요청 오류:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { userId, recipe } = req.body;

    if (!userId || !recipe) {
      return res.status(400).json({ error: "사용자 ID와 저장할 레시피 데이터가 필요합니다." });
    }

    // 레시피를 직접 DB에 저장
    const newRecipe = await db.Recipe.create({
      ...recipe,
      userId, // 사용자 ID 추가
    });

    // 저장된 레시피를 즐겨찾기에 추가
    await db.SavedRecipe.create({
      userId,
      recipeId: newRecipe.id,
    });

    return res.status(201).json({ success: true, message: "레시피 저장 성공", recipeId: newRecipe.id });
  } catch (error) {
    console.error("레시피 저장 오류:", error);
    return res.status(500).json({ error: "레시피 저장 중 오류 발생" });
  }
});

router.get("/saved", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "사용자 ID가 필요합니다." });
    }

    // 저장된 레시피 조회
    const savedRecipes = await db.SavedRecipe.findAll({
      where: { userId },
      include: [
        {
          model: db.Recipe,
          as: "recipe", 
          attributes: ["id", "title", "thumbnail", "cookingTime", "difficulty", "ingredients", "steps"]
        }
      ]
    });

    // 조회된 데이터 변환
    const formattedRecipes = savedRecipes.map((saved) => ({
      recipeId: saved.recipe.id,
      title: saved.recipe.title,
      thumbnail: saved.recipe.thumbnail,
      cookingTime: saved.recipe.cookingTime,
      difficulty: saved.recipe.difficulty,
      ingredients: saved.recipe.ingredients,
      steps: saved.recipe.steps,
    }));

    return res.json({ savedRecipes: formattedRecipes });
  } catch (error) {
    console.error("저장된 레시피 조회 오류:", error);
    return res.status(500).json({ error: "저장된 레시피 조회 중 오류 발생" });
  }
});

router.delete("/saved", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    if (!userId || !recipeId) {
      return res.status(400).json({ error: "사용자 ID와 레시피 ID가 필요합니다." });
    }

    // 저장된 레시피 삭제
    const deletedCount = await db.SavedRecipe.destroy({
      where: { userId, recipeId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ success: false, message: "삭제할 레시피가 없습니다." });
    }

    return res.json({ success: true, message: "레시피가 삭제되었습니다." });
  } catch (error) {
    console.error("레시피 삭제 오류:", error);
    return res.status(500).json({ error: "레시피 삭제 중 오류 발생" });
  }
});

export default router;
