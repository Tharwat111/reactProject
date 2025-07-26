import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import * as yup from 'yup'
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function CheckOut({totalPrice}) {
    let {cart,getLoggedUserCart}= useContext(cartContext)
    let[pay, setPay] = useState('cash')
    let navigate=useNavigate()
    const phoneReg=/^01[0125][0-9]{8}$/;
    const validationSchema = yup.object({
          details:yup.string().required('must be required'),
          phone:yup.string().required('must be required').matches(phoneReg,'must be Egyptian phone number'),
          city:yup.string().required('must be required').min(2,'at least two chars'),
      })
      let formik =useFormik({
        initialValues:{
          details:"",
          phone:"",
          city:"",
        },
        onSubmit:(x)=>{
            if(pay == 'cash'){
                payCash(x)
            }else{
                payOnline(x)
            }
        },
        validationSchema
      })
  async function payOnline(values) {
    try {
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
            {
                shippingAddress: values,
                
            },
            {
                headers:{
                    token: localStorage.getItem('token')
                },
            })
            if(data.status =="success"){
                window.location.href = data.session.url
            }
            
    } catch (err) {
        console.log(err);
        
    }
  }
  async function payCash(values) {
    try {
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
            {
                shippingAddress: values,
                
            },
            {
                headers:{
                    token: localStorage.getItem('token')
                },
            })
            if(data.status =="success"){
                navigate('/allorders')
                getLoggedUserCart()
            }
            
    } catch (err) {
        console.log(err);
        
    }
  }       
  return (
    <div className="container max-w-[535px] mt-12">
  <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
  <h2 className="text-center my-2 font-bold text-lg Outfit">Check Out</h2>
  <span className="block mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

  <form
    onSubmit={formik.handleSubmit}
    id="checkOut"
    className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary flex flex-col gap-6 mt-12"
  >
    <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

    <div className="flex gap-4 items-center">
      <span className="font-bold">Total :</span>
      <span className="text-primary font-semibold">
        ${totalPrice} USD
      </span>
    </div>

    <div>
      <input
        className="form-control w-full placeholder:text-sm border border-emerald-400 rounded-lg p-1.5"
        autoComplete="off"
        type="text"
        placeholder="Enter Your City Name"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    
      />
    </div>
    {formik.errors.city && formik.touched.city && (
        <p className="text-red-600 font-bold text-sm -my-3">
            {formik.errors.city}
        </p>
    )}
    <div>
      <input
        className="form-control w-full placeholder:text-sm border border-emerald-400 rounded-lg p-1.5"
        autoComplete="off"
        type="tel"
        placeholder="Enter Your Phone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>
    {formik.errors.phone && formik.touched.phone && (
        <p className="text-red-600 font-bold text-sm -my-3">
            {formik.errors.phone}
        </p>
    )}
    <div>
      <textarea
        className="w-full min-h-20 form-control placeholder:text-sm border border-emerald-400 rounded-lg p-1.5"
        placeholder="Details"
        name="details"
        value={formik.values.details}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>
    {formik.errors.details && formik.touched.details && (
        <p className="text-red-600 font-bold text-sm -my-3">
            {formik.errors.details}
        </p>
    )}
    <div className="flex max-md:flex-col gap-4 justify-between items-center">
      <button
        type="submit"
        onClick={()=>{
            setPay('cash')
        }}
        className="btn bg-primary w-full flex py-2 text-nowrap items-center justify-center gap-2 text-white hover:bg-darkPrimary cursor-pointer"
      >
        
        <span>Cash Order</span>
      </button>

      <button
        type="submit"
        onClick={()=>{
            setPay('online')
        }}
        className="btn btn-primary flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-primary bg-white text-darkPrimary w-full cursor-pointer"
      >
        
        <span>Online Order</span>
      </button>
    </div>
  </form>
</div>

  )
}
