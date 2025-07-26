import React, { useContext, useEffect } from "react";
import { wishlistContext } from "../../Context/WishListContext";
import WishListCard from "../../Components/WishListCard/WishListCard"; 
import Loader from "../../Components/Loader";
export default function Wishlist() {
  const { wishlist, loading, getLoggedUserWishlist } = useContext(wishlistContext);

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Your Wishlist</h2>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <Loader/>
        ) : wishlist?.count === 0 ? (
          <p className="text-center text-lg text-gray-600">Your wishlist is empty.</p>
        ) : (
          wishlist?.data?.map((product) => (
            <WishListCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
