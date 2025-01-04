import React from "react";

import ProductInfo from "./Product";
import GetAccessToken from "./GetAccessToken";

const MainPage = () => {
  return (
    <div>
      <ProductInfo />
      {/* <GetAccessToken /> */}
      <div className="h-96 bg-gray-100 flex items-center justify-center mb-2">
        <h2 className="text-xl">Product Showcase</h2>
      </div>
      <div className="mb-2">
        <div className="border p-5">Best Choice for you</div>
      </div>
      <div className="p-5">
        <div className="p-2 border w-32">
          <h3 className="text-small">My Product One</h3>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
