import React from 'react'
import { Link } from 'react-router-dom'
import Recomand from './Recomand'

const RecomandProducts = () => {
  return (
    <div className="w-full p-6">
        <div className="flex items-center justify-between p-4 py-2 bg-gray-100 border">
          <h2 className="text-2xl font-semibold text-gray-800">
            Similar Products
          </h2>
          <Link
            to="/search/sfdsdf"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Load More
          </Link>
        </div>
        <Recomand />
      </div>
  )
}

export default RecomandProducts