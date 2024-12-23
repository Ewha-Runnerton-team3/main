// 레시피 URL
export const recipeURL = "/recipe";

// 저장
// POST 파라미터
export interface RecipePostParamsType {
};

// POST 요청
export interface RecipePostRequestType {
    menu: string;
    userId: number;
}

// POST 응답:  백엔드로부터 받을 데이터
export interface RecipePostResponseType {
    recipe: Recipe;
}




////////////////////////////////////////////////////////
export interface Recipe {
    userId: number;
    id: number;
    name: string;
    totalTime: string;
    difficulty: string;
    difficultyScore: number;
    ingredients: Ingredient[];
    steps: Step[];
    createdAt: string;
    updatedAt: string;
    savedAt: string;
}

export interface Ingredient {
    ingredient: string;
    quantity: string;
}

export interface Step {
    id: number;
    step: string;
}