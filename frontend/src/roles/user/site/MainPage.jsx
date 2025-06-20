import React from "react";
 
import TopPicks from "../products/TopPicks";
import CategoryHeader from "../userLayout/CategoryHeader";
import HeroPanel from "./HeroPanel";

const MainPage = () => {
  return (
    <div>
      {/* <ProductSlider /> */}
      <HeroPanel />
      <CategoryHeader />
      <TopPicks />
      <div className="flex justify-center">
        <button className="p-4 bg-white text-center text-gray-600 border m-5 text-bold rounded shadow">
        Click here to Load More
      </button>
      </div>
    </div>
  );
};

export default MainPage;
