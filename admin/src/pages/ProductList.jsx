import React from "react";

const ProductList = ({ products = [], onView }) => {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">No products found.</div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition"
        > 
          <img
            src={JSON.parse(product.logText).ae_multimedia_info_dto.image_urls.split(";")[0] }
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold truncate">{product.title}</h3>
            {/* <p className="text-green-600 font-bold">{"$" +product.price}</p> */}
            <a
              href={
                "https://www.aliexpress.com/item/" + product.productId + ".html"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm underline"
            >
              View on AliExpress
            </a>
            {onView && (
              <button
                onClick={() => onView(product)}
                className="mt-2 block bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-xl"
              >
                View / Edit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
