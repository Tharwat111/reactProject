import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard'
import axios from 'axios'
import Loader from '../../Components/Loader'
import { useQuery } from '@tanstack/react-query'
export default function Home() {
  let [products,setProducts]=useState([])
  let[loading,setLoading]=useState(false)
  // let[error,setError]=useState(false)
  // async function getAllProducts(){
  //   setLoading(true)
  //   try {
  //     let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //     setProducts(data.data)
  //   } catch (err) {
  //     console.log(err);
  //     setError(true)
      
  //   }finally{
  //     setLoading(false)
      
  //   }

  // }
  
  let {data, isLoading , isFetching, isError, error, refetch} =useQuery({
  queryKey:['key'],
  queryFn:()=>{
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  })
  
  // useEffect(()=>{
  //   getAllProducts()
  // },[])
  return (
    <div>
      <div className="container">
        <h2 class="text-sky-950 p-2 relative text-3xl after:w-1/2 after:h-[3px] after:-translate-x-1/2 after:bg-primary after:absolute after:left-1/2 after:top-full font-bold text-center my-12">Shope now by popular products</h2>
        {isLoading ? (<Loader />)
          : error ? <h3 className="text-6xl text-red-500 text-center">the are No Products</h3> :
            (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {data?.data.data.map((item) => (
                  <ProductCard item={item} />
                ))}
              </div>)}
      </div>
    </div>
  )
}
