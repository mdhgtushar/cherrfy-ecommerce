import React from "react";
// import login_page_side from "../../../assets/img/login_page_side.jpg"
import { Outlet } from "react-router-dom";
const Auth = () => {
  return (
    <div>
      <div class="min-h-screen text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white flex justify-center flex-1 border">
          <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 text-center">
          <h1 className="text-xl">Cherrfy Ecommerce</h1>
            {/* <div>
              <img
                src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
                class="w-mx-auto"
              />
            </div> */}
            <Outlet />
          </div>
          <div class="flex-1 bg-green-100 text-center hidden lg:flex">
            {/* <div
              class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                "background-image": "url("+login_page_side+")",
              }}
            ></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
