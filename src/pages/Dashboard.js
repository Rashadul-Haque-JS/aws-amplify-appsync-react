import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify'; 
import { listProducts } from '../graphql/queries'; 

import ProductCard from '../components/ProductCard';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await API.graphql(graphqlOperation(listProducts));
        const productData = response.data.listProducts.items;
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="py-8 px-8">
      <h1 className="text-3xl font-semibold p-8">Products</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDashboard;

