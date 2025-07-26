import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from "../../Context/WishListContext";
import ProductCard from '../../Components/ProductCard/ProductCard';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  const { addProductToCart } = useContext(cartContext);
  const { wishlist, addToWishlist } = useContext(wishlistContext);

  const [related, setRelated] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      const product = res.data.data;
      const relatedRes = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/?category[in]=${product.category._id}`
      );
      setRelated(relatedRes.data.data);

      return res;
    },
  });

  const isInWishlist = wishlist?.data?.some(item => item._id === data?.data.data._id);

  if (isLoading) {
    return (
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/3 p-4 relative">
            <div className="h-80 bg-gray-200"></div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="h-6 bg-gray-200 w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 w-full mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-10 bg-gray-200 flex-1 rounded"></div>
              <div className="h-10 bg-gray-200 flex-1 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const product = data?.data.data;

  return (
    <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col items-center md:flex-row">
        <div className="md:w-1/3 p-4 relative">
          <img className="max-h-80 object-contain mx-auto" src={product.imageCover} alt={product.title} />
          <Swiper spaceBetween={20} slidesPerView={3}>
            {product.images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <img src={image} alt={`product-img-${idx}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="md:w-2/3 p-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 mb-4 bg-primary text-white hover:bg-darkPrimary transition duration-300 flex items-center gap-2 rounded-full cursor-pointer ms-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center mb-4">
            <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{product.ratingsAverage} ★</span>
            <span className="text-sm text-gray-500 ml-2">1,234 reviews</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-3xl font-bold text-gray-900">{product.price}</span>
              <span className="ml-2 text-sm font-medium text-gray-500 line-through">{product.price + 200}</span>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
          </div>

          <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>

          <div className="flex space-x-4">
            <button
              onClick={() => addToWishlist(product._id)}
              className="bg-primary hover:bg-green-600 text-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 cursor-pointer"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isInWishlist ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                -1.935 0-3.597 1.126-4.312 2.733
                -.715-1.607-2.377-2.733-4.313-2.733
                C5.1 3.75 3 5.765 3 8.25c0 7.22
                9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>

            <button
              onClick={() => addProductToCart(product._id)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 cursor-pointer"
              type="button"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-1 my-12 bg-primary" />
      <h3 className="text-4xl font-extrabold">Related Products</h3>
      <div className="w-1/4 h-1 my-4 bg-primary" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {related?.map(item => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
