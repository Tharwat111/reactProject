import React from "react";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishListContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
export default function WishListCard({product}) {
    const { addProductToCart } = useContext(cartContext);
    const { removeFromWishlist } = useContext(wishlistContext);
  return (
    <article className="wrapper grid grid-cols-12 gap-6 mt-4 pb-8 mx-3 border-b-2">
      <div className="col-span-4 md:col-span-3 lg:col-span-2">
        <div className="inner rounded-3xl overflow-hidden border-2">
          <img className="w-full block" src={product.imageCover} alt={product.title} />
        </div>
      </div>

      <div className="col-span-8 md:col-span-9 lg:col-span-10 flex max-lg:flex-col max-md:gap-4 justify-center items-start md:items-center">
        <div className="flex flex-col gap-1 w-full">
          <Link
            className="font-bold text-xl max-lg:line-clamp-1 hover:text-primary duration-300"
            to={`/product/${product._id}`}
          >
            {product.title}
          </Link>

          <div className="flex gap-2 items-center">
            <span>Rate:</span>
            <span className="text-primary">
              <i className="fa-solid text-yellow-400 fa-star mr-1"></i>
              {product.ratingsAverage}
            </span>
          </div>

          <div className="text-primary text-base">
            <span className="text-darkPrimary mr-1">Price:</span>
            <span>EGP {product.price}</span>
          </div>

          <div className="text-gray-500 text-sm">
            <span>{product.category?.name}</span>
            <span className="mx-1">|</span>
            <span>{product.brand?.name}</span>
            <span className="mx-1">|</span>
            <span className="text-green-500">Available</span>
          </div>
        </div>

        <div className="mt-4 flex max-xs:flex-col items-center gap-3 text-white">
                  <button
                      className="btn bg-primary gap-1 rounded-3xl text-sm w-full group flex items-center cursor-pointer hover:bg-darkPrimary"
                      onClick={() => addProductToCart(product._id)}
                  >
                      <i className="fa-solid fa-cart-plus group-hover:animate-shake"></i>
                      <span className="text-nowrap">ADD TO CART</span>
                  </button>

                  <button
                      className="btn flex items-center gap-1 rounded-3xl group text-sm cursor-pointer bg-red-600 hover:bg-red-500 duration-300"
                      onClick={() => removeFromWishlist(product.id)}
                  >
                      <i className="fa-solid fa-trash-can group-hover:animate-shake"></i>
                      <span>Remove</span>
                  </button>

        </div>
      </div>
    </article>
  );
}
