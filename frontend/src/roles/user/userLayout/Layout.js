 
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import HeaderTop from './HeaderTop' 
import CategoryNav from './CategoryNav'

const Layout = () => {
 
  return (
    <div>
        <div className='mb-5'>
          <HeaderTop />
          <CategoryNav />
        {/* <Header/> */}
        </div>
        <div className='container mx-auto'>
          
        <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout