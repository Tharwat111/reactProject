import React, { useState } from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
  let navigate=useNavigate()
  const passReg=/^.{6,}$/
  const phoneReg=/^01[0125][0-9]{8}$/
  const validationSchema = yup.object({
      name:yup.string().required('name is required').min(3,'name must be at least 3 chars').max(20,'the name must be less than 20'),
      email:yup.string().required('email is required').email('must be an email'),
      phone:yup.string().required('phone is required').matches(phoneReg,'must be Egyptian number'),
      password:yup.string().required('password is required').matches(passReg,'must be at least 6 chars'),
      rePassword:yup.string().required('required').oneOf([yup.ref('password')],'repassword must matched password'),
  })
  let formik =useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      password:"",
      rePassword:"",
    },
    onSubmit:(x)=>{
      console.log(x);
      sendDataToSignup(x)
    },
    validationSchema
  })
  async function sendDataToSignup(values){
    console.log(values);
    const options ={
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method:"post",
      data: values,
    }
    let loading=toast.loading('loading')
    try {
      const res = await axios(options);
      console.log(res);
      toast.success('Successfully created!');
      navigate('/Login')
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    } finally{
      toast.dismiss(loading)
    }
    
    
  }


  return (
    <div>
<main className="container pt-[80px] pb-[320px] max-md:pb-[380px]">
  <div className="container max-md:px-6 max-w-[535px]">
    <h2 className="text-primary font-bold text-3xl my-6 text-center">
      <i className="fa-regular fa-user mr-2" />
      <span>Register Now</span>
    </h2>
    <form className="w-full flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div>
        <input
          className="form-control w-full border border-gray-300 rounded-sm p-1.5"
          autoComplete="off"
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <p className="bg-red-300 p-3 rounded-2xl my-2">
          {formik.errors.name}
        </p>
        )}
      </div>
      <div>
        <input
          className="form-control w-full border border-gray-300 rounded-sm p-1.5"
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="bg-red-300 p-3 rounded-2xl my-2">
          {formik.errors.email}
        </p>
        )}
      </div>
      <div>
        <input
          className="form-control w-full border border-gray-300 rounded-sm p-1.5"
          autoComplete="off"
          type="tel"
          name="phone"
          placeholder="Enter Your Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone && (
          <p className="bg-red-300 p-3 rounded-2xl my-2">
          {formik.errors.phone}
        </p>
        )}
      </div>
      <div className="relative">
        <input
          className="form-control w-full border border-gray-300 rounded-sm p-1.5"
          autoComplete="off"
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password && (
          <p className="bg-red-300 p-3 rounded-2xl my-2">
          {formik.errors.password}
        </p>
        )}
        <i className="fa-regular text-slate-400 cursor-pointer fa-eye-slash absolute top-1/2 right-[15px] text-xs -translate-y-1/2" />
      </div>
      <div>
        <input
          className="form-control w-full border border-gray-300 rounded-sm p-1.5"
          autoComplete="off"
          type="password"
          name="rePassword"
          placeholder="Enter Your Re-Password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <p className="bg-red-300 p-3 rounded-2xl my-2">
          {formik.errors.rePassword}
        </p>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-4 justify-between items-center">
        <button type="submit" className="rounded-md bg-primary p-2 text-white cursor-pointer hover:bg-darkPrimary">
          Sign up
        </button>
        <Link className="text-primary text-sm hover:underline" to={'/Login'}>
          Already have an account ?
        </Link>
      </div>
    </form>
  </div>
</main>
    </div>
  )
}
