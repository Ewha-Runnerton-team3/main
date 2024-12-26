import React, { useState } from "react";
import { Recipe } from "../../../api/RecipeApiType.ts";

interface Props {
    totalItems: Recipe[]; // 부모로부터 받은 totalItems
}

const RecommendResult: React.FC<Props> = ({ totalItems }) => {
    return (
        <div>
          <div className="flex bg-lemon-10 text-goldbrown-90 font-semibold text-lg px-[40px] py-2">
            추천 결과
          </div>

          {/** 추천 레시피 결과 */}
          <div className="p-10 space-y-10">
            {totalItems.map((recipe, index) => (
              <div key={index} className="flex justify-between p-3 w-full h-[110px] rounded-lg bg-yellow-30">
                <div className="flex items-center w-[250px]">
                  <p className="flex font-regular text-md text-goldbrown-50 p-2">
                    {/* 인덱스 출력 */}
                    {index}
                  </p>
                  <p className="flex font-semibold text-md text-goldbrown-50 p-2">
                    {/* 레시피 이름 출력 */}
                    {recipe.name}
                  </p>
                </div>
                
                <div className="bg-yellow-0 rounded-lg p-2">
                    <div className="flex gap-5">
                      <p className="w-[120px]">조리 예상 시간</p>
                      {recipe.totalTime}
                    </div>
                    <div className="flex gap-5">
                      <p className="w-[120px]">조리 난이도</p>
                      {recipe.difficulty}
                    </div>
                    <div className="flex gap-5">
                      <p className="w-[120px]">조리 스코어</p>
                      {recipe.difficultyScore}
                    </div>
                  </div>
              </div>
            ))}
          </div>
          
        </div>
    );
}

export default RecommendResult