import Header from "../../components/layout/Header"
import MenuBar from "../../components/layout/MenuBar"
import dishImage from '../../assets/dish.webp';
import refrigeratorImage from '../../assets/refrigerator.webp';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

const Main = () => {
    const navigate = useNavigate();

    return (
        <>
          <Header/>
          <MenuBar/>
          <div className="bg-lemon-10 h-screen flex justify-center space-x-[80px] ">
            <div className="py-20 space-y-10">
              <p className="text-[35px] font-regular">
                "당신을 위한 레시피"
              </p>
              <p className="text-[50px] font-bold">
                쿡핏
              </p>
              <img className="w-[400px]" src={dishImage} alt="완성된 음식" />
            </div>
            <div className="py-[100px] space-y-10">
              <img className="w-[400px] rounded-2xl" src={refrigeratorImage} alt="냉장고 음식" />
              <div className="text-goldbrown-10 font-bold text-[16px] bg-yellow-80 rounded-lg text-center py-2 cursor-pointer hover:text-yellow-0"
                   onClick={() => navigate(PATHS.FAVORITE)}>
                레시피 추천받으러 가기
              </div>
            </div>
          </div>
        </>
    );
}

export default Main