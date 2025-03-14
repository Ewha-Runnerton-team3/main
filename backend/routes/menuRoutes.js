import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getRecipe } from "../services/recipeService.js"; 


dotenv.config();

const router = express.Router();

const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || "http://localhost:5000";
const NODE_SERVER_URL = process.env.NODE_SERVER_URL || "http://localhost:3000";

router.post("/recommendation", async (req, res) => {
    try {
        const { ingredients } = req.body;
        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({ message: "재료 리스트를 제공해야 합니다." });
        }

        // Python 서버로 메뉴 추천 요청
        const pythonResponse = await axios.post(`${PYTHON_SERVER_URL}/recommend`, { ingredients });

        if (!pythonResponse.data || !Array.isArray(pythonResponse.data)) {
            throw new Error("Python 서버에서 유효한 메뉴 데이터를 받지 못했습니다.");
        }

        // 추천된 상위 3개 메뉴 리스트 가져오기
        const recommendedMenus = pythonResponse.data.map(menu => menu.recipe_title).slice(0, 3);
        if (recommendedMenus.length === 0) {
            return res.status(404).json({ message: "추천 메뉴를 찾을 수 없습니다." });
        }

        // 추천된 메뉴에 대한 레시피 데이터 가져오기 
        const recipes = await Promise.all(recommendedMenus.map(async (menu) => {
            try {
                const recipe = await getRecipe(menu); 
                return { menu, recipe };
            } catch (error) {
                console.error(`레시피 가져오기 실패 (${menu}):`, error);
                return { menu, recipe: null };
            }
        }));

        return res.json({ recommendedMenus, recipes });

    } catch (error) {
        console.error("메뉴 추천 오류:", error);
        return res.status(500).json({ error: "메뉴 추천 중 오류 발생" });
    }
});

export default router;
