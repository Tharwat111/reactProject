import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard'
import axios from 'axios'
import Loader from '../../Components/Loader'
export default function Home() {
  let [products,setProducts]=useState([])
  let[loading,setLoading]=useState(false)
  let[error,setError]=useState(false)
  let[pagenation,setPagenation]=useState(null)
  function handlePageChange(x){
    getAllProducts(x)
  }
  async function getAllProducts(page=1){
    setLoading(true)
    try {
      let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      setProducts(data.data)
      setPagenation(data.metadata)
    } catch (err) {
      console.log(err);
      setError(true)
      
    }finally{
      setLoading(false)
      
    }

  }
  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <div>
      <div className="container">
        {loading ? (<Loader />)
          : error ? <h3 className="text-6xl text-red-500 text-center">the are No Products</h3> :
            (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((item) => (
                  <ProductCard item={item} />
                ))}
              </div>)}
      </div>
      <div className="flex my-5 justify-center items-center gap-4">
                {[...Array(pagenation?.numberOfPages)].map((item,index)=>(
                  <button
                  onClick={()=>{
                    handlePageChange(index+1)
                  }}
                   className="cursor-pointer btn bg-primary text-white">
                    {index+1}
                  </button>
                ))}
      </div>
    </div>

  )
}
