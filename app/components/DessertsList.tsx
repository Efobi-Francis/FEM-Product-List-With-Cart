'use client'

import React from "react";

import dessertData from "../data/data.json";
import CartBtn from "./CartBtn";
import { useStore } from "./DessertCart";

export default function DessertsList() {
  const {cart} = useStore()
  
  return (
    <div className=" flex flex-col md:grid grid-cols-3 gap-5">
      {dessertData.map((dessert, index) => {

        //checks and returns a boolean value if the item is contained in cart
        const isInCart = cart.some((item) => item.name === dessert.name);

        return(
          <div key={index} className="mb-6 ">
            <div className="relative flex flex-col mb-10">
              
              <img
                src={dessert.image.mobile}
                alt={dessert.name}
                className={`rounded-xl md:hidden ${
                  isInCart ? "border-4 border-[hsl(14,86%,42%)]" : ""
                }`} // Add border if the item is in the cart
              />

              <img
                src={dessert.image.tablet}
                alt={dessert.name}
                className={`rounded-xl hidden md:block lg:hidden ${
                  isInCart ? "border-4 border-[hsl(14,86%,42%)]" : ""
                }`} // Add border if the item is in the cart
              />

              <img
                src={dessert.image.desktop}
                alt={dessert.name}
                className={`rounded-xl hidden lg:block ${
                  isInCart ? "border-4 border-[hsl(14,86%,42%)]" : ""
                }`} // Add border if the item is in the cart
              />

              <CartBtn
                dessertName={dessert.name}
                dessertThumbnail={dessert.image.thumbnail}
                dessertPrice={dessert.price}
              />
            </div>
            <div>
              <p className="text-[hsl(12,20%,44%)]">{dessert.category}</p>
              <h3 className="font-bold text-lg">{dessert.name}</h3>
              <p className="font-bold text-xl text-[hsl(14,86%,42%)]">
                ${dessert.price.toFixed(2)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  );
}
