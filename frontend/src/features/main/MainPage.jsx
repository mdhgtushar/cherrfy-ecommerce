import React from 'react'
import ProductSlider from "../product/ProductSlider"
import TopPicks from '../product/TopPicks'

const MainPage = () => {
  return (
    <div>
        <ProductSlider />
        <TopPicks />
        <div className="px-4 py-8 bg-white text-center">
          <h2 className="text-xl font-bold mb-4">LOADING...</h2> 
        </div>
    </div>
  )
}

export default MainPage