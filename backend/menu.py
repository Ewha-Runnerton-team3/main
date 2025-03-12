from flask import Flask, request, jsonify
from flask_cors import CORS  
import pandas as pd
from rank_bm25 import BM25Okapi
import os

app = Flask(__name__)
CORS(app)

# CSV 데이터 로드
file_path = "./utils/TB_RECIPE_SEARCH_241226.csv"
df = pd.read_csv(file_path, encoding="utf-8")

# 필요한 컬럼만 추출 (레시피 제목, 재료, 카테고리, 난이도, 조리시간 포함)
df = df[['RCP_TTL', 'CKG_MTRL_CN', 'CKG_KND_ACTO_NM', 'CKG_DODF_NM', 'CKG_TIME_NM']].dropna()

# 텍스트 정제 (불필요한 문자 제거)
df['CKG_MTRL_CN'] = df['CKG_MTRL_CN'].str.replace(r'\[재료\]|\d+|\|', '', regex=True)

def find_top_recipes(user_ingredients, category=None, difficulty=None, cooking_time=None, top_n=3):
    #사용자가 입력한 재료 리스트와 필터링 조건(카테고리, 난이도, 조리시간)에 맞는 상위 N개 레시피 추천 (BM25 적용)
    if not user_ingredients:
        return []

    filtered_df = df.copy()

    if category:
        filtered_df = filtered_df[filtered_df["CKG_KND_ACTO_NM"] == category]
    if difficulty:
        filtered_df = filtered_df[filtered_df["CKG_DODF_NM"] == difficulty]
    if cooking_time:
        filtered_df = filtered_df[filtered_df["CKG_TIME_NM"] == cooking_time]

    if filtered_df.empty:
        return []

    # 레시피 재료를 토큰화
    tokenized_ingredients = [ingredients.split() for ingredients in filtered_df["CKG_MTRL_CN"]]

    # BM25 모델 생성 (필터링된 데이터셋 기준)
    bm25 = BM25Okapi(tokenized_ingredients)

    # 사용자 입력을 토큰화
    user_tokenized_query = user_ingredients.split()

    # BM25 점수 계산
    scores = bm25.get_scores(user_tokenized_query)

    # 상위 top_n개 레시피 찾기
    top_indices = scores.argsort()[-top_n:][::-1]
    return [
        {
            "recipe_title": filtered_df.iloc[idx]["RCP_TTL"],
            "ingredients": filtered_df.iloc[idx]["CKG_MTRL_CN"]
        }
        for idx in top_indices
    ]

@app.route("/recommend", methods=["POST"])
def recommend():
    """사용자가 입력한 재료 리스트 및 필터링 조건에 맞는 상위 3개 레시피 추천"""
    data = request.get_json()
    user_ingredients = data.get("ingredients", [])
    category = data.get("category", None)  
    difficulty = data.get("difficulty", None) 
    cooking_time = data.get("cooking_time", None)  

    if not user_ingredients:
        return jsonify({"error": "재료 목록이 비어 있습니다."}), 400

    top_recipes = find_top_recipes(" ".join(user_ingredients), category, difficulty, cooking_time, top_n=3)

    if not top_recipes:
        return jsonify({"message": "해당 조건에 맞는 레시피가 없습니다."}), 200

    return jsonify(top_recipes)

if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    app.run(host="0.0.0.0", port=5000, debug=debug_mode)
