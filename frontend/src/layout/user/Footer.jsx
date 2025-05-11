import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
      <footer className="bg-gray-100 text-black py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Returns & Refunds</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Company Info</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li><Link to="/manage-admin" target="_blank">ADMIN</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Download App</h3>
            <p className="text-sm">Shop faster with our app</p>
            <div className="flex space-x-2 mt-2">
              <div className="w-24 h-10 bg-white text-red-700 text-center rounded flex items-center justify-center text-xs font-semibold">App Store</div>
              <div className="w-24 h-10 bg-white text-red-700 text-center rounded flex items-center justify-center text-xs font-semibold">Google Play</div>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-6">© 2025 YourCompany. All rights reserved.</div>

      </footer>
    );
  }

export default Footer