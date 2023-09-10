import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-72">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 mx-auto mb-4 object-cover"
      />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-purple-600 font-semibold">${product.price}</p>
      </div>
      <p className="text-gray-600 mb-2 pt-1 pb-1">{product.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center px-4 mt-4 rounded cursor-pointer"  onClick={toggleLike}>
        {isLiked ? (
          <FontAwesomeIcon icon={faHeart} className="text-red-500 fa-x w-20 mt-1 shadow py-1" />
        ) : (
          <FontAwesomeIcon icon={faHeart} className="text-gray-300 fa-x w-20 mt-1 shadow py-1" />
        )}
        </div>
        <button
          className='bg-black text-white px-4 py-1 rounded mt-4 block hover:bg-teal-600'
         
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
