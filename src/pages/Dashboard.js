import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listProducts } from "../graphql/queries";
import ProductCard from "../components/ProductCard";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await API.graphql(graphqlOperation(listProducts));
        const productData = response.data.listProducts.items;
        setProducts(productData.length > 0 ? productData : fakeProducts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        setProducts(fakeProducts);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="py-8 px-8 min-h-screen">
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
        <h1 className="text-3xl font-semibold p-8">Products</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductDashboard;

const fakeProducts = [
  {
    id: "1",
    title: "Product 1",
    description: "Description for Product 1",
    image: "https://source.unsplash.com/random/200x200/?t-shirt=1",
    price: 19.99,
  },
  {
    id: "2",
    title: "Product 2",
    description: "Description for Product 2",
    image: "https://source.unsplash.com/random/200x200/?t-shirt=2",
    price: 24.99,
  },
  {
    id: "3",
    title: "Product 3",
    description: "Description for Product 3",
    image: "https://source.unsplash.com/random/200x200/?t-shirt=3",
    price: 29.99,
  },
  {
    id: "4",
    title: "Product 4",
    description: "Description for Product 4",
    image: "https://source.unsplash.com/random/200x200/?t-shirt=4",
    price: 34.99,
  },
  {
    id: "5",
    title: "Product 5",
    description: "Description for Product 5",
    image: "https://source.unsplash.com/random/200x200/?t-shirt=5",
    price: 39.99,
  },
  {
    id: "6",
    title: "Product 6",
    description: "Description for Product 6",
    image: "https://source.unsplash.com/random/200x200/?t-shirt=6",
    price: 44.99,
  },
];
