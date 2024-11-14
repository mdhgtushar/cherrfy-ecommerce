import React from 'react'

const SubdomainCard = ({ title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );

export default SubdomainCard