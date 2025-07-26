import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loader from "../../Components/Loader";

export default function CategoryProducts() {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  async function getProductsByCategory() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductsByCategory();
  }, [id]);

  return (
    <div className="container mx-auto p-4 pt-24 min-h-screen">
      <button
              type="button"  
              onClick={() => navigate(-1)}
              className="p-2 mb-4 bg-primary text-white hover:bg-darkPrimary transition duration-300 flex items-center gap-2 rounded-full cursor-pointer"
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
          </button>
      {loading ? (
        <Loader/>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      )}
    </div>
  );
}
