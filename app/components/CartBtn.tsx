'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useStore } from './DessertCart'

import icon_addToCart from '@/public/images/icon-add-to-cart.svg'

interface DessertData {
    dessertName: string
    dessertPrice: number
    dessertThumbnail: string
}

export default function CartBtn({ dessertName, dessertPrice, dessertThumbnail }: DessertData) {
    const [clicked, setClicked] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const { cart, addToCart, removeFromCart } = useStore()

    useEffect(() => {
        const itemInCart = cart.find((item) => item.name === dessertName)
        if (itemInCart) {
            setClicked(true)
            setQuantity(itemInCart.quantity) 
        } else {
            setClicked(false)
            // Resets the quantity to 1 if the item is not in the cart
            setQuantity(1)
        }
    }, [cart, dessertName])

    const handleCartBTN = () => {
        if (!clicked) {
            setClicked(true)
            addToCart({
                name: dessertName,
                image: dessertThumbnail,
                quantity: quantity,
                price: dessertPrice,
                total_price: dessertPrice * quantity,
            })
        }
    }

    const handleDecrementBTN = () => {
        if (quantity > 1) { 
            setQuantity(quantity - 1)
            removeFromCart({
                name: dessertName,
                image: '',
                quantity: 1,
                price: dessertPrice,
                total_price: quantity,
            })
        }
    }

    const handleIncrementBTN = () => {
        setQuantity(quantity + 1)
        addToCart({
            name: dessertName,
            image: '',
            quantity: 1,
            price: dessertPrice,
            total_price: quantity,
        })
    }

    return (
        <div className="absolute -bottom-5 inset-x-0 flex justify-center mx-auto rounded-full w-40 h-10 addCartBTN ">
            {clicked ? (
                <div className="flex items-center justify-between w-full rounded-full bg-[hsl(14,86%,42%)] px-3.5">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleDecrementBTN()
                        }}
                        className=' cursor-pointer group'
                        aria-label="Decrement Quantity"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className=" h-5 w-5 border-2 border-[hsl(20,50%,98%)] rounded-full px-[2px] group-hover:bg-white " 
                            width="10" height="2" fill="none" viewBox="0 0 10 2"
                        >
                            <path fill="#fff" className=' group-hover:fill-[hsl(14,86%,42%)]' d="M0 .375h10v1.25H0V.375Z"/>
                        </svg>
                    </button>

                    <span className=' text-[hsl(20,50%,98%)]'>{quantity}</span>

                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleIncrementBTN()
                        }}
                        className=' cursor-pointer group'
                        aria-label="Increment Quantity"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className=" h-5 w-5 border-2 border-[hsl(20,50%,98%)] rounded-full px-[2px] group-hover:bg-white" 
                            width="10" height="10" fill="none" viewBox="0 0 10 10"
                        >
                            <path fill="#fff" className=' group-hover:fill-[hsl(14,86%,42%)]' d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                        </svg>
                    </button>
                </div>
            ) : (
                <button 
                    onClick={(e) => {
                        e.preventDefault()
                        handleCartBTN()
                    }} 
                    className="flex items-center gap-2 cursor-pointer hover:text-[hsl(14,86%,42%)]"
                >
                    <Image
                        src={icon_addToCart}
                        alt="icon add to cart"
                    />
                    <span className=' font-semibold '>Add to Cart</span>
                </button>
            )}
        </div>
    )
}