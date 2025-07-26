import React from 'react'
import googlePlay from "../../assets/get-google-play-BORhnNzJ.png";
import amazon from "../../assets/amazon-pay-C6yg0mFR.png";
import express from "../../assets/American-Express-Color-BA04NtD8.png";
import mastercard from "../../assets/mastercard-DpLisAk5.webp";
import paypal from "../../assets/paypal-f_p-vrjl.png";
import appleStore from "../../assets/get-apple-store-9A-0RbJo.png";

export default function Footer() {
  return (
    <footer className="bg-mainLight py-10 px-5">
  <div className="container">
    <header>
      <h2 className="text-2xl font-bold text-darkPrimary">Get the FreshCart App</h2>
      <p className="my-2 text-gray-500">
        We will send you a link, open it on your phone to download the app
      </p>
    </header>

    <div className="flex max-xs:flex-col items-center gap-2 sm:gap-6">
      <input
        type="email"
        placeholder="Email..."
        className="form-control flex-grow max-xs:w-full"
      />
      <button className="btn text-white bg-primary py-[5px] max-xs:w-full hover:bg-darkPrimary cursor-pointer">
        Share app link
      </button>
    </div>

    <div className="flex max-sm:flex-wrap justify-between items-center mt-8 border-y py-4 border-slate-200">
      <div className="paymentTools flex gap-4 items-center">
        <h2 className="text-nowrap">Payment Partners</h2>
        <a href="">
          <img
            className="w-16"
            src={amazon}
            alt="amazon Logo"
          />
        </a>
        <a href="/">
          <img
            className="w-16"
            src={express}
            alt="{express Logo"
          />
        </a>
        <a href="/">
          <img
            className="w-16"
            src={mastercard}
            alt="mastercard Logo"
          />
        </a>
        <a href="/">
          <img
            className="w-16"
            src={paypal}
            alt="paypal Logo"
          />
        </a>
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-nowrap">Get deliveries with FreshCart</h2>
        <a href="">
          <img
            className="w-24"
            src={appleStore}
            alt="apple Logo"
          />
        </a>
        <a href="">
          <img
            className="w-28"
            src={googlePlay}
            alt="Google play Logo"
          />
        </a>
      </div>
    </div>
  </div>
</footer>

  )
}
