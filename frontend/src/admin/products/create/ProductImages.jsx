import React from 'react'

const ProductImages = ({images}) => {
    
  const imageList = images ? images?.split(";") : [];
  console.log(images);
  return (
    <div className="flex gap-2"> 
        {
            imageList.map((image,index) => (
                <img src={image} alt="" key={index} className="w-20 h-20 object-cover" />
            ))
        }
    </div>
  )
}

export default ProductImages