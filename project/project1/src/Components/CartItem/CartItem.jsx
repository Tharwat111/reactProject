import React from 'react'
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { useState } from 'react';
import { useEffect } from 'react';
export default function CartItem({item}) {
    console.log('item',item);
    let{removeCartItem,updateCartItem,disableBtn}=useContext(cartContext)
    let [count,setCount] = useState(item?.count)
    function updateCount(){
        if(count == item?.count){
            return
        }
        updateCartItem(count,item.product._id)
    }
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
         src={item?.product.imageCover}
         alt="product-image"
         className="w-full rounded-lg sm:w-40"/>
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{item?.product.title}</h2>
            <p className="mt-1 text-xs text-gray-700">{item?.product.category?.name}</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <button disabled={disableBtn} onClick={()=>{updateCartItem(item?.count-1,item.product._id)}} className="disabled:cursor-not-allowed cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
              <input onChange={(e)=>{
                setCount(e.target.value)
              }} onBlur={updateCount} className="h-8 w-28 border bg-white text-center text-xs outline-none" type="number" value={count} min={1} />
              <button disabled={disableBtn} onClick={()=>{updateCartItem(item?.count+1,item.product._id)}} className="disabled:cursor-not-allowed cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">${item?.price * item?.count}</p>
              <button onClick={()=>{removeCartItem(item.product._id)}} className="btn bg-red-300 hover:bg-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
