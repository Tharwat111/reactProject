import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import CartItem from '../../Components/CartItem/CartItem'
import { useEffect } from 'react'
import CheckOut from '../../Components/CheckOut/CheckOut'

export default function Cart() {
  let { cart, getLoggedUserCart,loading,clearCart} = useContext(cartContext)
  useEffect(() => {
    getLoggedUserCart()
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 pt-20 animate-pulse">
        <div className="mb-10 text-center text-2xl font-bold h-6" />
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <div className="h-12 bg-gray-200 rounded mb-2" />
            <div className="h-12 bg-gray-200 rounded mb-2" />
            <div className="h-12 bg-gray-200 rounded mb-2" />
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <div className="h-5 bg-gray-200 rounded w-1/4" />
              <div className>
                <div className="mb-1 h-5 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
            <div className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 h-10" />
          </div>
        </div>
      </div>

    );
  }

  return (
    <div className=" bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-1/2">
          {cart?.data?.products.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/2">
          <div
            onClick={clearCart}
           className="my-4 btn bg-red-300 hover:bg-red-400">
            clear Cart
          </div>
          
          <hr className="my-4" />
          <CheckOut totalPrice={cart?.data?.totalCartPrice}/>
        </div>
      </div>
    </div>

  )
}
