// 히스토리 레시피 URL
export const recipeURL = "/recipe/history";

// 가져오기(조회)
// GET 파라미터 (경로 파라미터로 사용하기로 결정, 쿼리 파라미터는 안 보냄)
export interface RecipeGetParamsType {
    userId: number;
};

// GET 응답
import { Recipe } from "./RecipeApiType.ts";
export interface RecipeGetResponseType {
    recipes: Recipe[];
}