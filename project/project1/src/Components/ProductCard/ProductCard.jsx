import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishListContext';

export default function ProductCard({ item }) {
  let { addProductToCart } = useContext(cartContext);
  let { addToWishlist, removeFromWishlist, wishlist } = useContext(wishlistContext);
  const isInWishlist = wishlist?.data?.some((w) => w.id === item._id);


  return (
    <article
      data-aos="fade-up"
      data-aos-duration="500"
      className="productCard group flex flex-col gap-3 shadow-xl rounded-md overflow-hidden aos-init aos-animate"
    >
      <header className="relative">
        <a href={`/product/${item._id}`}>
          <img src={item.imageCover} className="w-full" alt={item.title} />
        </a>
        <div className="layer -translate-y-1/2 flex justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2">
          <div
            onClick={() => {
              isInWishlist ? removeFromWishlist(item._id) : addToWishlist(item._id);
            }}
            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-darkPrimary duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          <div
            onClick={() => {
              addProductToCart(item._id);
            }}
            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-darkPrimary duration-700 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10.5" cy="19.5" r="1.5"></circle>
              <circle cx="17.5" cy="19.5" r="1.5"></circle>
              <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path>
              <path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path>
            </svg>
          </div>

          <Link
            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-darkPrimary duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
            to={`/ProductDetails/${item.id}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link>
        </div>
      </header>

      <footer className="py-6 px-5">
        <header>
          <h2 className="line-clamp-1 text-primary">
            <a className="hover:text-orange-500 duration-300" href={`/product/${item._id}`}>
              {item.title}
            </a>
          </h2>
          <h2 className="line-clamp-1 font-semibold my-1">{item.category.name}</h2>
          <div className="text-gray-500 text-sm">
            <span>{item.brand.name}</span>
            <span className="mx-1">|</span>
            {item.quantity > 0 ? <span className="text-green-500">Available</span> : <span className="text-red-500">Sold Out</span>}
          </div>
        </header>

        <footer className="flex justify-between mt-2 items-center">
          <span className="text-primary flex items-center">{item.price}</span>
          <div className="rating flex gap-2 items-center">
            <span>
              <i className="fa-solid fa-star text-rating"></i>
            </span>
            <span>{item.ratingsAverage}</span>
          </div>
        </footer>
      </footer>
    </article>
  );
}
