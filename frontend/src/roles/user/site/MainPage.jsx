import React from "react";
 
import TopPicks from "../products/TopPicks";
import CategoryHeader from "../userLayout/CategoryHeader";
import HeroPanel from "./HeroPanel";
import CartRightSide from "../Order/CartRightSide";
import ChatSidebar from "../../../components/ChatSidebar";

const MainPage = () => {
  return (
    <div>
      {/* <ProductSlider /> */}
      <HeroPanel />
      <CategoryHeader />
      <TopPicks /> 
      <CartRightSide />
      {/* <ChatSidebar /> */}
    </div>
  );
};

export default MainPage;
