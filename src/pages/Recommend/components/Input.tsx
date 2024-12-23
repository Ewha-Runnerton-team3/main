import React, { useState } from "react";


interface InputFormProps {
    handleSubmit: () => void;
}

const Input: React.FC<InputFormProps> = ({ handleSubmit }) => {
    // 상태 관리
    const [ingredient, setIngredient] = useState("");
    const [selectedCuisine, setCuisine] = useState("");
    const [selectedCookingMethod, setCookingMethod] = useState("");
    const cuisineOptions = ['한식', '중식', '양식', '일식'];
    const cookingMethodOptions = ['볶음', '찜', '튀김', '구이', '국물', '간편식'];
    
    return (
        <div>
          <div className="flex bg-lemon-10 text-goldbrown-90 font-semibold text-lg px-[40px] py-2">
            정보 입력하기
          </div>
            
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-[40px]">
                <p className="text-goldbrown-80 font-semibold text-lg mb-4">냉장고에 들어있는 재료</p>
                <input
                  type="text"
                  id="ingredient"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  className="border px-3 py-2 w-[500px] rounded-lg"
                  placeholder="재료를 입력하세요"
                />
              </div>

              <div>
                <p className="text-goldbrown-80 font-semibold text-lg mb-4">먹고 싶은 음식</p>

                <div className="flex space-x-4 mb-[40px]">
                  {cuisineOptions.map((cuisine) => (
                    <div
                      key={cuisine}
                      onClick={() => setCuisine(cuisine)}
                      className={`p-4 cursor-pointer border rounded-lg text-center text-goldbrown-50 font-semibold text-sm 
                        ${selectedCuisine === cuisine ? 'bg-yellow-50 text-yellow-0' : 'bg-grayscale-10 border border-grayscale-40 border-1 hover:bg-grayscale-20'}`}
                    >
                      {cuisine}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-goldbrown-80 font-semibold text-lg mb-4">원하는 요리 방식</p>
                
                <div className="flex space-x-4 mb-[60px]">
                  {cookingMethodOptions.map((cookingMethod) => (
                    <div
                      key={cookingMethod}
                      onClick={() => setCookingMethod(cookingMethod)}
                      className={`p-4 cursor-pointer border rounded-lg text-center text-goldbrown-50 font-semibold text-sm 
                        ${selectedCookingMethod === cookingMethod ? 'bg-yellow-50 text-yellow-0' : 'bg-grayscale-10 border border-grayscale-40 border-1 hover:bg-grayscale-20'}`}
                    >
                      {cookingMethod}
                    </div>
                  ))}
                </div>
              </div>

              {/* 전송 버튼 */}
              <div>
                <button
                  type="submit"
                  className="bg-yellow-50 text-goldbrown-40 font-semibold px-8 py-3 rounded-md cursor-pointer hover:bg-yellow-70 hover:text-goldbrown-80"
                >
                  레시피 추천 받기
                </button>
              </div>
            </form>
          </div>
        </div>
    );
}

export default Input