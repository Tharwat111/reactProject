import axios from "axios";
import { useState, useEffect, createContext } from "react";
import toast from "react-hot-toast";

export let wishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);

  
  async function getLoggedUserWishlist() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("Wishlist: ", data);
      setWishlist(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  
  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Added to wishlist");
      getLoggedUserWishlist();
    } catch (err) {
      console.log(err);
    }
  }

  
  async function removeFromWishlist(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Removed from wishlist");
      getLoggedUserWishlist();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        getLoggedUserWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
