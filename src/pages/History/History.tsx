import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import Header from "../../components/layout/Header"
import MenuBar from "../../components/layout/MenuBar"

import { getRecipe } from "../../api/RecipeHistoryApiService";
import { Recipe } from "../../api/RecipeApiType.ts";

const History = () => {
    // 로그인 정보 가져오기
    const { userId } = useAuth();

    // 페이지 상태 관리
    const itemsPerPage = 3; // 한 페이지에 보여줄 항목 수
    const [currentItems, setCurrentItems] = useState<Recipe[]>([]); // 현재 페이지에 표시할 아이템들
    const [totalItems, setTotalItems] = useState<Recipe[]>([]);     // 전체 아이템들
    //const [totalItems, setTotalItems] = useState<string[]>(["블라블라", "블라블라", "블라블라", "블라블라"]);     // 전체 아이템들, 임시1, 임시2
    const [currentPage, setCurrentPage] = useState(1);    // 아이템 페이지 상태 관리
    const [totalPages, setTotalPages] = useState(1);      // 전체 페이지 상태 관리

    // 아이템 가져오기
    const fetchData = async () => {
      if(userId === null)
        return;
      
      try {
        // getRecipe 함수 호출
        const data = await getRecipe({ userId });
        
        // recipes 배열 추출
        const recipes: Recipe[] = data.recipes;

        setTotalItems(recipes);

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

      // 전체 페이지 수 계산
      setTotalPages(Math.ceil(totalItems.length / itemsPerPage));

      // 현재 페이지에 보여줄 아이템들 설정
      const startIndex = (currentPage - 1) * itemsPerPage;
      setCurrentItems(totalItems.slice(startIndex, startIndex + itemsPerPage));
    }, [currentPage, totalItems]); // currentPage 또는 totalItems가 변경될 때마다 실행


    // 페이지 변경 함수
    const movePage = (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };


    return (
        <div>
          <Header/>
          <MenuBar/>

          {/** 데이터 배치 순서 */}
          <div className="flex justify-end bg-lemon-10 text-goldbrown-90 font-semibold text-lg px-[40px] py-2">
            최신순
          </div>

          {/** 현재 페이지에 해당하는 데이터 */}
          <div className="p-10 flex space-x-10">
            {currentItems.map((item, index) => (
              <div key={index} className="w-[300px] h-[300px] rounded-lg bg-yellow-30">
                <div className="h-[230px]"></div>
                <p className="flex font-semibold text-lg p-5">
                  {/* 레시피 이름 출력 */}
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          {/** 페이지네이션 */}
          <div className="px-10">
            <button
              className="px-4 py-2 bg-grayscale-30 rounded-md"
              onClick={() => movePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            
            {/** 번호 */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-yellow-70 text-white"
                    : "bg-grayscale-20"
                }`}
                onClick={() => movePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}


            <button
              className="px-4 py-2 bg-grayscale-30 rounded-md"
              onClick={() => movePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
    );
}

export default History