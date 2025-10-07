import React from "react";
 
import TopPicks from "../products/TopPicks";
import CategoryHeader from "../userLayout/CategoryHeader";
import HeroPanel from "./HeroPanel";
import CartRightSide from "../Order/CartRightSide";

const MainPage = () => {
  return (
    <div>
      {/* <ProductSlider /> */}
      <HeroPanel />
      <CategoryHeader />
      <TopPicks /> 
      <CartRightSide />
    </div>
  );
};

export default MainPage;
