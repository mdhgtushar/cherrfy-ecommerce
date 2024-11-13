function App() {
  return (
    <header>
      {/* Begin Header Top Area */}
      <div className="header-top">
        <div className="container">
          <div className="row">
            {/* Begin Header Top Left Area */}
            <div className="col-lg-3 col-md-4">
              <div className="header-top-left">
                <ul className="phone-wrap">
                  <li>
                    <span>Telephone Enquiry:</span>
                    <a href="#">(+123) 123 321 345</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Header Top Left Area End Here */}
            {/* Begin Header Top Right Area */}
            <div className="col-lg-9 col-md-8">
              <div className="header-top-right">
                <ul className="ht-menu">
                  {/* Begin Setting Area */}
                  <li>
                    <div className="setting ht-setting">
                      <ul className="ht-setting-list">
                        <li>
                          <a href="login-register.html">My Account</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="login-register.html">Sign In</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* Setting Area End Here */}
                  {/* Begin Currency Area */}
                  <li>
                    <span className="currency-selector-wrapper">
                      Currency :
                    </span>
                    <div className="ht-currency-trigger">
                      <span>USD $</span>
                    </div>
                    <div className="currency ht-currency">
                      <ul className="ht-setting-list">
                        <li>
                          <a href="#">EUR €</a>
                        </li>
                        <li className="active">
                          <a href="#">USD $</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* Currency Area End Here */}
                  {/* Begin Language Area */}
                  <li>
                    <span className="language-selector-wrapper">
                      Language :
                    </span>
                    <div className="ht-language-trigger">
                      <span>English</span>
                    </div>
                    <div className="language ht-language">
                      <ul className="ht-setting-list">
                        <li className="active">
                          <a href="#">
                            <img src="images/menu/flag-icon/1.jpg" alt="" />
                            English
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="images/menu/flag-icon/2.jpg" alt="" />
                            Français
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a href="login-register.html">Login/Register</a>
                  </li>
                  {/* Language Area End Here */}
                </ul>
              </div>
            </div>
            {/* Header Top Right Area End Here */}
          </div>
        </div>
      </div>
      {/* Header Top Area End Here */}
      {/* Begin Header Middle Area */}
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row">
            {/* Begin Header Logo Area */}
            <div className="col-lg-3">
              <div className="logo pb-sm-30 pb-xs-30">
                <a href="index.html">
                  <img src="images/menu/logo/1.jpg" alt="" />
                </a>
              </div>
            </div>
            {/* Header Logo Area End Here */}
            {/* Begin Header Middle Right Area */}
            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              {/* Begin Header Middle Searchbox Area */}
              <form action="#" className="hm-searchbox">
                <select className="nice-select select-search-category">
                  <option value={0}>All</option>
                  <option value={10}>Laptops</option>
                  <option value={17}>- - Prime Video</option>
                  <option value={20}>- - - - All Videos</option>
                  <option value={21}>- - - - Blouses</option>
                  <option value={22}>- - - - Evening Dresses</option>
                  <option value={23}>- - - - Summer Dresses</option>
                  <option value={24}>- - - - T-shirts</option>
                  <option value={25}>- - - - Rent or Buy</option>
                  <option value={26}>- - - - Your Watchlist</option>
                  <option value={27}>- - - - Watch Anywhere</option>
                  <option value={28}>- - - - Getting Started</option>
                  <option value={18}>- - - - Computers</option>
                  <option value={29}>- - - - More to Explore</option>
                  <option value={30}>- - - - TV &amp; Video</option>
                  <option value={31}>- - - - Audio &amp; Theater</option>
                  <option value={32}>- - - - Camera, Photo </option>
                  <option value={33}>- - - - Cell Phones</option>
                  <option value={34}>- - - - Headphones</option>
                  <option value={35}>- - - - Video Games</option>
                  <option value={36}>- - - - Wireless Speakers</option>
                  <option value={19}>- - - - Electronics</option>
                  <option value={37}>- - - - Amazon Home</option>
                  <option value={38}>- - - - Kitchen &amp; Dining</option>
                  <option value={39}>- - - - Furniture</option>
                  <option value={40}>- - - - Bed &amp; Bath</option>
                  <option value={41}>- - - - Appliances</option>
                  <option value={11}>TV &amp; Audio</option>
                  <option value={42}>- - Chamcham</option>
                  <option value={45}>- - - - Office</option>
                  <option value={47}>- - - - Gaming</option>
                  <option value={48}>- - - - Chromebook</option>
                  <option value={49}>- - - - Refurbished</option>
                  <option value={50}>- - - - Touchscreen</option>
                  <option value={51}>- - - - Ultrabooks</option>
                  <option value={52}>- - - - Blouses</option>
                  <option value={43}>- - Meito</option>
                  <option value={53}>- - - - Hard Drives</option>
                  <option value={54}>- - - - Graphic Cards</option>
                  <option value={55}>- - - - Processors (CPU)</option>
                  <option value={56}>- - - - Memory</option>
                  <option value={57}>- - - - Motherboards</option>
                  <option value={58}>- - - - Fans &amp; Cooling</option>
                  <option value={59}>- - - - CD/DVD Drives</option>
                  <option value={44}>- - Sony Bravia</option>
                  <option value={60}>- - - - Sound Cards</option>
                  <option value={61}>- - - - Cases &amp; Towers</option>
                  <option value={62}>- - - - Casual Dresses</option>
                  <option value={63}>- - - - Evening Dresses</option>
                  <option value={64}>- - - - T-shirts</option>
                  <option value={65}>- - - - Tops</option>
                  <option value={12}>Smartphone</option>
                  <option value={66}>- - Camera Accessories</option>
                  <option value={68}>- - - - Octa Core</option>
                  <option value={69}>- - - - Quad Core</option>
                  <option value={70}>- - - - Dual Core</option>
                  <option value={71}>- - - - 7.0 Screen</option>
                  <option value={72}>- - - - 9.0 Screen</option>
                  <option value={73}>- - - - Bags &amp; Cases</option>
                  <option value={67}>- - XailStation</option>
                  <option value={74}>- - - - Batteries</option>
                  <option value={75}>- - - - Microphones</option>
                  <option value={76}>- - - - Stabilizers</option>
                  <option value={77}>- - - - Video Tapes</option>
                  <option value={78}>- - - - Memory Card Readers</option>
                  <option value={79}>- - - - Tripods</option>
                  <option value={13}>Cameras</option>
                  <option value={14}>headphone</option>
                  <option value={15}>Smartwatch</option>
                  <option value={16}>Accessories</option>
                </select>
                <input type="text" placeholder="Enter your search key ..." />
                <button className="li-btn" type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
              {/* Header Middle Searchbox Area End Here */}
              {/* Begin Header Middle Right Area */}
              <div className="header-middle-right">
                <ul className="hm-menu">
                  {/* Begin Header Middle Wishlist Area */}
                  <li className="hm-wishlist">
                    <a href="wishlist.html">
                      <span className="cart-item-count wishlist-item-count">
                        0
                      </span>
                      <i className="fa fa-heart-o" />
                    </a>
                  </li>
                  {/* Header Middle Wishlist Area End Here */}
                  {/* Begin Header Mini Cart Area */}
                  <li className="hm-minicart">
                    <div className="hm-minicart-trigger">
                      <span className="item-icon" />
                      <span className="item-text">
                        £160
                        <span className="cart-item-count">2</span>
                      </span>
                    </div>
                    <span />
                    <div className="minicart">
                      <ul className="minicart-product-list">
                        <li>
                          <a
                            href="single-product.html"
                            className="minicart-product-image"
                          >
                            <img
                              src="images/product/small-size/3.jpg"
                              alt="cart products"
                            />
                          </a>
                          <div className="minicart-product-details">
                            <h6>
                              <a href="single-product.html">
                                Aenean eu tristique
                              </a>
                            </h6>
                            <span>£80 x 1</span>
                          </div>
                          <button className="close">
                            <i className="fa fa-close" />
                          </button>
                        </li>
                        <li>
                          <a
                            href="single-product.html"
                            className="minicart-product-image"
                          >
                            <img
                              src="images/product/small-size/4.jpg"
                              alt="cart products"
                            />
                          </a>
                          <div className="minicart-product-details">
                            <h6>
                              <a href="single-product.html">
                                Aenean eu tristique
                              </a>
                            </h6>
                            <span>£80 x 1</span>
                          </div>
                          <button className="close">
                            <i className="fa fa-close" />
                          </button>
                        </li>
                      </ul>
                      <p className="minicart-total">
                        SUBTOTAL: <span>£160</span>
                      </p>
                      <div className="minicart-button">
                        <a
                          href="checkout.html"
                          className="li-button li-button-dark li-button-fullwidth li-button-sm"
                        >
                          <span>View Full Cart</span>
                        </a>
                        <a
                          href="checkout.html"
                          className="li-button li-button-fullwidth li-button-sm"
                        >
                          <span>Checkout</span>
                        </a>
                      </div>
                    </div>
                  </li>
                  {/* Header Mini Cart Area End Here */}
                </ul>
              </div>
              {/* Header Middle Right Area End Here */}
            </div>
            {/* Header Middle Right Area End Here */}
          </div>
        </div>
      </div>
      {/* Header Middle Area End Here */}
      {/* Begin Header Bottom Area */}
      <div className="header-bottom header-sticky d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Begin Header Bottom Menu Area */}
              <div className="hb-menu hb-menu-2 d-xl-block">
                <nav>
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li className="megamenu-holder">
                      <a href="shop-left-sidebar.html">Shop</a>
                      <ul className="megamenu hb-megamenu">
                        <li>
                          <a href="shop-left-sidebar.html">Shop Page Layout</a>
                          <ul>
                            <li>
                              <a href="shop-3-column.html">Shop 3 Column</a>
                            </li>
                            <li>
                              <a href="shop-4-column.html">Shop 4 Column</a>
                            </li>
                            <li>
                              <a href="shop-left-sidebar.html">
                                Shop Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-right-sidebar.html">
                                Shop Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list.html">Shop List</a>
                            </li>
                            <li>
                              <a href="shop-list-left-sidebar.html">
                                Shop List Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-right-sidebar.html">
                                Shop List Right Sidebar
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product-gallery-left.html">
                            Single Product Style
                          </a>
                          <ul>
                            <li>
                              <a href="single-product-carousel.html">
                                Single Product Carousel
                              </a>
                            </li>
                            <li>
                              <a href="single-product-gallery-left.html">
                                Single Product Gallery Left
                              </a>
                            </li>
                            <li>
                              <a href="single-product-gallery-right.html">
                                Single Product Gallery Right
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-top.html">
                                Single Product Tab Style Top
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-left.html">
                                Single Product Tab Style Left
                              </a>
                            </li>
                            <li>
                              <a href="single-product-tab-style-right.html">
                                Single Product Tab Style Right
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product.html">Single Products</a>
                          <ul>
                            <li>
                              <a href="single-product.html">Single Product</a>
                            </li>
                            <li>
                              <a href="single-product-sale.html">
                                Single Product Sale
                              </a>
                            </li>
                            <li>
                              <a href="single-product-group.html">
                                Single Product Group
                              </a>
                            </li>
                            <li>
                              <a href="single-product-normal.html">
                                Single Product Normal
                              </a>
                            </li>
                            <li>
                              <a href="single-product-affiliate.html">
                                Single Product Affiliate
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-holder">
                      <a href="blog-left-sidebar.html">Blog</a>
                      <ul className="hb-dropdown">
                        <li className="sub-dropdown-holder">
                          <a href="blog-left-sidebar.html">Blog Grid View</a>
                          <ul className="hb-dropdown hb-sub-dropdown">
                            <li>
                              <a href="blog-2-column.html">Blog 2 Column</a>
                            </li>
                            <li>
                              <a href="blog-3-column.html">Blog 3 Column</a>
                            </li>
                            <li>
                              <a href="blog-left-sidebar.html">
                                Grid Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-right-sidebar.html">
                                Grid Right Sidebar
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-dropdown-holder">
                          <a href="blog-list-left-sidebar.html">
                            Blog List View
                          </a>
                          <ul className="hb-dropdown hb-sub-dropdown">
                            <li>
                              <a href="blog-list.html">Blog List</a>
                            </li>
                            <li>
                              <a href="blog-list-left-sidebar.html">
                                List Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-list-right-sidebar.html">
                                List Right Sidebar
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-dropdown-holder">
                          <a href="blog-details-left-sidebar.html">
                            Blog Details
                          </a>
                          <ul className="hb-dropdown hb-sub-dropdown">
                            <li>
                              <a href="blog-details-left-sidebar.html">
                                Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-details-right-sidebar.html">
                                Right Sidebar
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-dropdown-holder">
                          <a href="blog-gallery-format.html">Blog Format</a>
                          <ul className="hb-dropdown hb-sub-dropdown">
                            <li>
                              <a href="blog-audio-format.html">
                                Blog Audio Format
                              </a>
                            </li>
                            <li>
                              <a href="blog-video-format.html">
                                Blog Video Format
                              </a>
                            </li>
                            <li>
                              <a href="blog-gallery-format.html">
                                Blog Gallery Format
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="megamenu-static-holder">
                      <a href="index.html">Pages</a>
                      <ul className="megamenu hb-megamenu">
                        <li>
                          <a href="blog-left-sidebar.html">Blog Layouts</a>
                          <ul>
                            <li>
                              <a href="blog-2-column.html">Blog 2 Column</a>
                            </li>
                            <li>
                              <a href="blog-3-column.html">Blog 3 Column</a>
                            </li>
                            <li>
                              <a href="blog-left-sidebar.html">
                                Grid Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-right-sidebar.html">
                                Grid Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-list.html">Blog List</a>
                            </li>
                            <li>
                              <a href="blog-list-left-sidebar.html">
                                List Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-list-right-sidebar.html">
                                List Right Sidebar
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="blog-details-left-sidebar.html">
                            Blog Details Pages
                          </a>
                          <ul>
                            <li>
                              <a href="blog-details-left-sidebar.html">
                                Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-details-right-sidebar.html">
                                Right Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-audio-format.html">
                                Blog Audio Format
                              </a>
                            </li>
                            <li>
                              <a href="blog-video-format.html">
                                Blog Video Format
                              </a>
                            </li>
                            <li>
                              <a href="blog-gallery-format.html">
                                Blog Gallery Format
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="index.html">Other Pages</a>
                          <ul>
                            <li>
                              <a href="login-register.html">My Account</a>
                            </li>
                            <li>
                              <a href="checkout.html">Checkout</a>
                            </li>
                            <li>
                              <a href="compare.html">Compare</a>
                            </li>
                            <li>
                              <a href="wishlist.html">Wishlist</a>
                            </li>
                            <li>
                              <a href="shopping-cart.html">Shopping Cart</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="index.html">Other Pages 2</a>
                          <ul>
                            <li>
                              <a href="contact.html">Contact</a>
                            </li>
                            <li>
                              <a href="about-us.html">About Us</a>
                            </li>
                            <li>
                              <a href="faq.html">FAQ</a>
                            </li>
                            <li>
                              <a href="404.html">404 Error</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="about-us.html">About Us</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                    {/* Begin Header Bottom Menu Information Area */}
                    <li className="hb-info f-right p-0 d-sm-none d-lg-block">
                      {/* <span>6688 London, Greater London BAS 23JK, UK</span> */}
                    </li>
                    {/* Header Bottom Menu Information Area End Here */}
                  </ul>
                </nav>
              </div>
              {/* Header Bottom Menu Area End Here */}
            </div>
          </div>
        </div>
      </div>
      {/* Header Bottom Area End Here */}
      {/* Begin Mobile Menu Area */}
      <div className="mobile-menu-area d-lg-none d-xl-none col-12">
        <div className="container">
          <div className="row">
            <div className="mobile-menu"></div>
          </div>
        </div>
      </div>
      {/* Mobile Menu Area End Here */}
    </header>
  );
}

export default App;