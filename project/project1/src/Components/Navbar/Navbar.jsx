import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContext'
import { useState } from 'react'
import { wishlistContext } from '../../Context/WishListContext';
export default function Navbar() {
  let { token, setToken } = useContext(authContext)
  let { cart } = useContext(cartContext)
  let [counter, setCounter] = useState(cart?.numOfCartItems)
  let { wishlist } = useContext(wishlistContext);

  useEffect(() => {

    setCounter(cart?.numOfCartItems)

  }, [cart])
  const logOut = () => {
    localStorage.removeItem('token')
    setToken(null)
  }
  return (
    <div className="bg-mainLight py-10 shadow-2xl">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold text-nowrap text-darkPrimary">
          <a href="/">
            <i className="fa-brands fa-opencart text-primary mr-2">
            </i>
            <span>FreshCart</span>
          </a>
        </h1>
     {token ? (<ul className="flex justify-between items-center gap-5">
          <li className="text-lg link-hover focus-within:text-primary focus-within:font-bold hover:text-primary"><Link to={'/Home'}>Home</Link></li>
          <li className="text-lg link-hover focus-within:text-primary focus-within:font-bold hover:text-primary"><Link to={'/Products'}>Products</Link></li>
          <li className="text-lg link-hover focus-within:text-primary focus-within:font-bold hover:text-primary"><Link to={'/Categories'}>Categories</Link></li>
          <li className="text-lg link-hover focus-within:text-primary focus-within:font-bold hover:text-primary"><Link to={'/Brands'}>Brands</Link></li>
          <li className="text-lg link-hover focus-within:text-primary focus-within:font-bold hover:text-primary"><Link to={'/AllOrders'}>Orders</Link></li>

        </ul>) : null}
        {!token ? (<ul className="flex justify-between items-center gap-x-5">

          <li className="text-2xl"><Link to={'/Login'}>Login</Link></li>
          <li className="text-2xl"><Link to={'/Register'}>Register</Link></li>
        </ul>) :
          <ul className="flex justify-between items-center gap-x-5">
            <li className="text-2xl relative text-green-800">
              <Link to={'/Cart'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </Link>
              {counter>0 && <div className=" absolute -top-4 -left-4 text-sm flex items-center justify-center size-5 rounded-full bg-red-300 ">
                {cart?.numOfCartItems}
              </div>}
            </li>
            {/* Wishlist */}
            <li className="text-2xl relative text-green-800">
  <Link to={'/WishList'}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={wishlist?.count > 0 ? "green" : "none"}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 hover:text-red duration-300"
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
  </Link>
</li>


            <span className="text-2xl cursor-pointer" onClick={logOut}>Logout</span>
          </ul>}
      </div>
    </div>

  )
}
