import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export let cartContext = createContext(null)
import React from 'react'
import toast from "react-hot-toast";


export default function CartContextProvider({children}) {
    const [cart,setCart]=useState(null)
    const [loading,setLoading]=useState(false)
    const [disableBtn,setDisableBtn]=useState(false)
    async function getLoggedUserCart() {
        setLoading(true)
        try {
            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
                    token: localStorage.getItem('token')

                }
            })
            console.log(data);
            setCart(data)
            
        } catch (err) {
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }
    async function addProductToCart(productId) {
        
        try {
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
                productId
            },{
                headers:{
                    token: localStorage.getItem('token')

                }
            })
            console.log(data);
            toast.success('product added to cart')
            setCart(data)
        } catch (err) {
            console.log(err);
            
        }
    }
    async function removeCartItem(cartItemId) {
        
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,{
                headers:{
                    token: localStorage.getItem('token')

                }
            })
            console.log(data);
            toast.success('successfully delete')
            setCart(data)
        } catch (err) {
            console.log(err);
            
        }
    }
    async function clearCart() {
        
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers:{
                    token: localStorage.getItem('token')

                }
            })
            console.log(data);
            toast.success('All productes have been deleted')
            setCart(data)
        } catch (err) {
            console.log(err);
            
        }
    }
    async function updateCartItem(count,cartItemId) {
        setDisableBtn(true)
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,{
                count
            },{
                headers:{
                    token: localStorage.getItem('token')

                }
            })
            console.log(data);
            toast.success('successfully edit')
            setCart(data)
        } catch (err) {
            console.log(err);
            
        }finally{setDisableBtn(false)}
    }
    useEffect(()=>{
        getLoggedUserCart()
    },[])
  return (
    <cartContext.Provider value={{disableBtn,updateCartItem,clearCart,removeCartItem,loading,cart,addProductToCart,getLoggedUserCart}}>
        {children}
    </cartContext.Provider>
  )
}
