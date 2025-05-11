'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useStore } from './DessertCart'

import icon_addToCart from '@/public/images/icon-add-to-cart.svg'
import icon_decrement from '@/public/images/icon-decrement-quantity.svg'
import icon_increment from '@/public/images/icon-increment-quantity.svg'

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
        <div className="absolute -bottom-5 inset-x-0 flex justify-center mx-auto rounded-full w-40 h-10 addCartBTN">
            {clicked ? (
                <div className="flex items-center justify-between w-full rounded-full bg-[hsl(14,86%,42%)] px-3.5">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleDecrementBTN()
                        }}
                        className=' cursor-pointer'
                        aria-label="Decrement Quantity"
                    >
                        <Image
                            src={icon_decrement}
                            alt="icon decrement"
                            className=" h-5 w-5 border-2 border-[hsl(20,50%,98%)] rounded-full px-[2px]"
                        />
                    </button>

                    <span className=' text-[hsl(20,50%,98%)]'>{quantity}</span>

                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleIncrementBTN()
                        }}
                        aria-label="Increment Quantity"
                    >
                        <Image
                            src={icon_increment}
                            alt="icon increment"
                            className=" h-5 w-5 border-2 border-[hsl(20,50%,98%)] rounded-full px-[2px]"
                        />
                    </button>
                </div>
            ) : (
                <button 
                    onClick={(e) => {
                        e.preventDefault()
                        handleCartBTN()
                    }} 
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Image
                        src={icon_addToCart}
                        alt="icon add to cart"
                        className=" "
                    />
                    <span className=' font-bold'>Add to Cart</span>
                </button>
            )}
        </div>
    )
}