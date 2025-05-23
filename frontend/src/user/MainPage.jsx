import React from 'react'
import ProductSlider from './ProductSlider'
import TopPicks from './TopPicks'
import CategoryHeader from '../layout/user/CategoryHeader'

const MainPage = () => {
  return (
    <div>
        <ProductSlider />
          <CategoryHeader />
        <TopPicks />
        <div className="px-4 py-8 bg-white text-center"> 
        </div>
    </div>
  )
}

export default MainPage