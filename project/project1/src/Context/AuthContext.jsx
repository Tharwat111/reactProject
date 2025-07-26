import React, { useEffect } from 'react'
import { createContext, useState } from "react";
import toast ,{Toaster} from 'react-hot-toast'
import axios from 'axios'



export let authContext = createContext(null)
export default function AuthContextProvider({children}) {
  async function verifyToken(){
     if(localStorage.getItem("token")){
      try{
      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem('userId',data.decoded.id)
      
    }catch(err){
      console.log(err);
      toast.error(err.response.data.message);
      setToken(null)
      localStorage.removeItem('token')
      
    }
     }
  }
  useEffect(()=>{
  verifyToken()},[])
    let [token,setToken]=useState(localStorage.getItem('token'))
  return (
    <authContext.Provider value={{token,setToken,verifyToken}}>
        {children}
    </authContext.Provider>
  )
}
