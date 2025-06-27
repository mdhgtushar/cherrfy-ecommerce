
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import HeaderTop from './HeaderTop'
import CategoryNav from './CategoryNav'
import CurrencySelector from './CurrencySelector'

const Layout = () => {

  return (
    <div>
      <div className='mb-0'>
        {/* <HeaderTop /> */}
        <CategoryNav />
        {/* <Header/> */}
      </div>
      <div className='container mx-auto pt-5'>  
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout