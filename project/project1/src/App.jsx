import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Layout from './Pages/Layout/Layout'
import Products from './Pages/Products/Products'
import Categories from './Pages/Categories/Categories'
import Cart from './Pages/Cart/Cart'
import Brands from './Pages/Brands/Brands'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllOrders from './Pages/AllOrders/AllOrders'
import toast ,{Toaster} from 'react-hot-toast'
import ProtectedRoutes from './Protected/ProtectedRoutes'
import AuthContextProvider from './Context/AuthContext'
import LoginProtected from './Protected/LoginProtected'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import ResetCode from './Pages/ResetCode/ResetCode';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import WishlistContextProvider from './Context/WishListContext';
import WishList from './Pages/WishList/WishList'
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts'
import BrandProducts from './Pages/BrandProducts/BrandProducts'


function App() {
  let routes=createBrowserRouter(
    [
      {path:'/',element: <Layout/>,children:[
        {path:'/Home',element:(<ProtectedRoutes><Home/></ProtectedRoutes>)},
        {path:'/Products',element:(<ProtectedRoutes><Products/></ProtectedRoutes>)},
        {path:'/ProductDetails/:id',element:(<ProtectedRoutes><ProductDetails/></ProtectedRoutes>)},
        {path:'/Categories',element:(<ProtectedRoutes><Categories/></ProtectedRoutes>)},
        {path:'/Cart',element:(<ProtectedRoutes><Cart/></ProtectedRoutes>)},
        {path:'/allorders',element:(<ProtectedRoutes><AllOrders/></ProtectedRoutes>)},
        {path:'/WishList',element:(<ProtectedRoutes><WishList/></ProtectedRoutes>)},
        {path:'/Brands',element:(<ProtectedRoutes><Brands/></ProtectedRoutes>)},
        {path:'/category/:id',element:(<ProtectedRoutes><CategoryProducts/></ProtectedRoutes>)},
        {path:'/Brands',element:(<ProtectedRoutes><Brands/></ProtectedRoutes>)},
        {path:'/brand/:id',element:(<ProtectedRoutes><BrandProducts/></ProtectedRoutes>)},
        {path:'/Login',element:<LoginProtected><Login/></LoginProtected>},
        {path: '/ForgetPassword', element: <LoginProtected><ForgetPassword /></LoginProtected>},
        {path: '/ResetCode', element: <LoginProtected><ResetCode /></LoginProtected>},
        {path: '/ResetPassword', element: <LoginProtected><ResetPassword /></LoginProtected>},
        {path:'/Register',element:<LoginProtected><Register/></LoginProtected>},
        
      ]
    }
    ]
  )
  let client = new QueryClient()
  return (
  <QueryClientProvider client={client}>
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </WishlistContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>
)

}
export default App
