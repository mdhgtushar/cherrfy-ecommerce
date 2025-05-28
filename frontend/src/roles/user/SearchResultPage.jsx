import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import ProductBox from './ProductBox';
import FilterSidebar from './FilterSidebar';

const SearchResultPage = () => {
  const { products, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch]);
  const handleFilters = (filters) => {
    console.log("Apply these filters to fetch products:", filters);
    // Fetch or filter products accordingly
  };
  return (
    <div className='flex h-screen'> 
          <FilterSidebar onFilterChange={handleFilters} /> 
        <div className='flex-1 p-2'> 
            <h2 className='text-lg font-semibold mb-2 p-2 bg-gray-100 px-5'> Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2">
        {products.map((product) => {
         return <ProductBox product={product} key={product._id} />
        })}
      </div>
        </div>
    </div>
  )
}

export default SearchResultPage