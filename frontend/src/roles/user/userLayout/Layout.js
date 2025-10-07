
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import HeaderTop from './HeaderTop'
import CategoryNav from './CategoryNav'
import CurrencySelector from './CurrencySelector'
import BackToTopButton from '../../../components/BackToTop'
import FullscreenOffer from '../../../components/FullScreenOffer'

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
      
      <FullscreenOffer />
      <BackToTopButton />
      <Footer />
    </div>
  )
}

export default Layout