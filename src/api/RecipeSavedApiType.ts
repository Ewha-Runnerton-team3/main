// 저장된 레시피 URL
export const recipeURL = "/recipe/saved";

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



////////////////////////////////////////////////////////
// 저장
// POST 파라미터
export interface RecipePostParamsType {
};

// POST 요청
export interface RecipePostRequestType {
    userId: number;
    recipeId: number;
}

// POST 응답:  백엔드로부터 받을 데이터
export interface RecipePostResponseType {
    id: number;
    userId: number;
    recipeId: number;
    createdAt: string;
    updatedAt: string;
}


////////////////////////////////////////////////////////
// 삭제
// DELETE 파라미터
export interface RecipeDeleteParamsType {
    userId: number;
    recipeId: number;
}

// DELETE 응답:  null 값을 응답받음
