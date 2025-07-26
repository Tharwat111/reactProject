import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader'; // تأكد من المسار الصحيح لمكون Loader

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  async function fetchCategories() {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="container pt-[80px] pb-[320px] max-md:pb-[380px]">
      
      <h2 className="text-center border-b border-t py-2 text-primary text-lg">Shop by Category</h2>
      <button
              type="button"  
              onClick={() => navigate(-1)}
              className="p-2 my-4 bg-primary text-white hover:bg-darkPrimary transition duration-300 flex items-center gap-2 rounded-full cursor-pointer"
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
          </button>
      {loading ? (
        <Loader />
      ) : error ? (
        
        <h3 className="text-center text-2xl text-red-500 mt-10">Error loading categories. Please try again later.</h3>
      ) : (
        <section className="wrapper grid grid-cols-12 px-2 pb-4">
          {categories.map(category => (
            <article
              key={category._id}
              className="flex flex-col justify-center items-center p-4 max-xs:col-span-6 col-span-4 md:col-span-3 lg:md:col-span-2"
            >
              <Link
                to={`/category/${category._id}`}
                className="relative group inline-block mb-2 size-[150px] rounded-xl shadow-md cursor-pointer p-1"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="size-full object-cover rounded-xl group-hover:scale-[1.03] duration-500"
                />
              </Link>
              <h2 className="mt-2 font-semibold text-center">{category.name}</h2>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
