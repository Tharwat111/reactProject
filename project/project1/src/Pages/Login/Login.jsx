import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import ForgetPassword from '../ForgetPassword/ForgetPassword'
export default function Login() {
  let navigate=useNavigate()
  const [showPass,setShowPass] = useState('password')
  let {token,setToken,verifyToken}=useContext(authContext)
  const passReg=/^.{6,}$/
  const validationSchema = yup.object({
      email:yup.string().required('email is required').email('must be an email'),
      password:yup.string().required('password is required').matches(passReg,'must be at least 6 chars'),
  })
  let formik =useFormik({
    initialValues:{
      email:"",
      password:"",
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
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method:"post",
        data: values,
      }
      let loading=toast.loading('loading')
      try {
        const res = await axios(options);
        console.log(res);
        localStorage.setItem('token',res.data.token)
        setToken(res.data.token)
        verifyToken()
        toast.success('logged in');
        navigate('/')
        
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message)
      } finally{
        toast.dismiss(loading)
      }
    }
    function toggleShowPass(){
        setShowPass(showPass === 'password' ? 'text' : 'password')
      }
  return (
    <div>
<main className="container pt-[80px] pb-[320px] max-md:pb-[380px]">
  <div className="container max-md:px-6 max-w-[535px]">
    <h2 className="text-primary font-bold text-3xl my-6 text-center">
      <i className="fa-regular fa-user mr-2" />
      <span>Login</span>
    </h2>
    <form className="w-full flex flex-col gap-6" onSubmit={formik.handleSubmit}>
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
      <div className="relative">
        <input
          className="form-control w-full border border-gray-300 rounded-sm p-1.5"
          autoComplete="off"
          type={showPass}
          name="password"
          placeholder="Enter Your Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="absolute right-4 top-2 cursor-pointer" onClick={toggleShowPass}>
          {showPass === "password" ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>)}
        </div>
        {formik.errors.password && formik.touched.password && (
          <p className="bg-red-300 p-3 rounded-2xl my-2">
          {formik.errors.password}
        </p>
        )}
        <i className="fa-regular text-slate-400 cursor-pointer fa-eye-slash absolute top-1/2 right-[15px] text-xs -translate-y-1/2" />
      </div>
      <div className="mt-2 flex flex-col gap-4 justify-between items-center">
        <button type="submit" className=" rounded-md bg-primary w-full p-2 text-white cursor-pointer hover:bg-darkPrimary">
          Login
        </button>
        <Link className="text-primary text-sm hover:underline" to={'/ForgetPassword'}>Forgot your password?</Link>
        <Link className="rounded-md bg-primary p-2 text-white cursor-pointer hover:bg-darkPrimary" to={'/Register'}>Create New Account</Link>
      </div>
    </form>
  </div>
</main>
    </div>
  )
}
