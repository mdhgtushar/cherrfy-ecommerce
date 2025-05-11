import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import HeaderTop from './HeaderTop'

const Layout = () => {
  return (
    <div>
        <div className='mb-5'>aa
          <HeaderTop />
        {/* <Header/> */}
        </div>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout