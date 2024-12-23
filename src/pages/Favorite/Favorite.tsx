import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';

import { getRecipe } from "../../api/RecipeSavedApiService";
import { Recipe } from "../../api/RecipeApiType.ts";

import Header from "../../components/layout/Header"
import MenuBar from "../../components/layout/MenuBar"

import SavedRecipe from "./components/SavedRecipe"
import SavedIngredient from "./components/SavedIngredient"

const Favorite = () => {
    // 레시피/재료 컴포넌트트 토글 상태
    const [toggle, setToggle] = useState<number>(0);

    // 로그인 정보 가져오기
    const { userId } = useAuth();
    
    // 아이템 가져오기
    const [recipeItems, setRecipeItems] = useState<Recipe[]>([]);
    const fetchData = async () => {
      if(userId === null)
        return;
      
      try {
        // getRecipe 함수 호출
        const data = await getRecipe({ userId });
        
        // recipes 배열 추출
        const recipes: Recipe[] = data.recipes;

        setRecipeItems(recipes);

        // 받은 recipes 배열을 순회하면서 각각의 Recipe 객체 데이터 파싱
        recipes.forEach((recipe) => {
          /*
          console.log(`Recipe Name: ${recipe.name}`);
          console.log(`Total Time: ${recipe.totalTime}`);
          console.log(`Difficulty: ${recipe.difficulty}`);
          console.log(`Difficulty Score: ${recipe.difficultyScore}`);
          console.log(`Saved At: ${recipe.savedAt}`);
          console.log('Ingredients:', recipe.ingredients);
          console.log('Steps:', recipe.steps);
          */
        });

      } catch (error) {
        // 에러 처리
        console.error('Failed to fetch recipe:', error);
      }
    };


    // 페이지 변경에 따라 표시할 데이터와 총 페이지 수 계산
    useEffect(() => {
      // API 호출
      fetchData();
    }, []); // 페이지 렌더링될때마다 실행

    
    return (
        <div>
          <Header/>
          <MenuBar/>

          {/* 조건부 렌더링 */}
          {toggle === 0? (
            <>
              {/** 토글 버튼 */}
              <div className="flex bg-lemon-10 font-semibold text-lg px-[40px] py-2">
                <p className="text-goldbrown-90 mr-10 cursor-pointer"
                   onClick={() => setToggle(0)}>
                  내가 저장한 레시피
                </p>
                <p className="text-grayscale-50 cursor-pointer"
                   onClick={() => setToggle(1)}>
                  내가 저장한 재료
                </p>
              </div>
              
              {/** 렌더링 */}
              <SavedRecipe totalItems={recipeItems} />
            </>
          ) : (
            <>
              {/** 토글 버튼 */}
              <div className="flex bg-lemon-10 font-semibold text-lg px-[40px] py-2">
                <p className="text-grayscale-50 mr-10 cursor-pointer"
                  onClick={() => setToggle(0)}>
                  내가 저장한 레시피
                </p>
                <p className="text-goldbrown-90 cursor-pointer"
                  onClick={() => setToggle(1)}>
                  내가 저장한 재료
                </p>
              </div>
              
              {/** 렌더링 */}
              <SavedIngredient/>
            </>
          )}
        </div>
    );
}

export default Favorite