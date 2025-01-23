// 추천 URL
export const recommendURL = "/menu/recommendation";

// 저장
// POST 파라미터
export interface RecommendPostParamsType {
};

// POST 요청
export interface RecommendPostRequestType {
    ingredients: string[];
}

// POST 응답:  백엔드로부터 받을 데이터
export interface RecommendPostResponseType {
    menus: Menu[];
}




////////////////////////////////////////////////////////
export interface Menu {
    menu_name: string;
    ingredients: string[];
    match_rate: number;
}