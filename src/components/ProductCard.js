import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-72">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 mx-auto mb-4 object-cover"
      />
      <div className='flex justify-between items-center'>
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-purple-600 font-semibold">${product.price}</p>
      </div>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className='flex justify-center'>
        <button className="bg-black text-white px-4 py-2 rounded-md mt-4 block">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
