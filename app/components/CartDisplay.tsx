'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { useStore, CartItem } from './DessertCart'

import icon_emptyCart from '@/public/images/illustration-empty-cart.svg'
import icon_carbonNeutral from '@/public/images/icon-carbon-neutral.svg'
import icon_orderConfirmed from '@/public/images/icon-order-confirmed.svg'


import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

export default function CartDisplay() {
  const { cart, deleteFromCart, resetCart } = useStore()

  const totalItem_quantity = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }, [cart])

  const grandTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity * item.price
    }, 0)
  }, [cart])

  const handleDelete = (item: CartItem) => {
    deleteFromCart(item)
  }

  const handleReset = () => {
    resetCart();
  }

  return (
    <div className=" bg-[hsl(20,50%,98%)] rounded-xl p-6 md:h-fit md:basis-1/3 md:mt-5">
      <h2 className=' text-3xl text-[hsl(14,86%,42%)] font-bold mb-10'> Your Cart ({totalItem_quantity})</h2>

      {cart.length === 0 ? (
        <div className=" flex flex-col items-center mb-5">
          <Image src={icon_emptyCart} alt="Icon empty cart" />
          <h2 className=' text-[hsl(7,20%,60%)] font-bold mt-5'>Your added items will appear here</h2>
        </div>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className=" flex flex-col">
              <div className=" flex justify-between items-center">
                <div className=" flex flex-col gap-1">
                  <span className=' font-bold'>{item.name}</span>
                  <div className=" flex gap-2">
                    <span className=' text-[hsl(14,86%,42%)] font-semibold'>{item.quantity}x</span>
                    <span className=' text-[hsl(12,20%,44%)]'>@{item.price.toFixed(2)}</span>
                    <span className='font-semibold text-[hsl(12,20%,44%)]'>${item.total_price.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(item)}
                    className=' cursor-pointer group'
                    aria-label="Delete Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 border-2 border-[hsl(7,20%,60%)] group-hover:border-[hsl(14,65%,9%)] rounded-full px-[2px]' 
                      width="10" height="10" fill="none" viewBox="0 0 10 10"
                    >
                      <path fill="#CAAFA7" className=' group-hover:fill-[hsl(14,65%,9%)]' d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                    </svg>
                    
                  </button>
                </div>
              </div>
              <div className=' h-[1px] w-full bg-[hsl(14,25%,72%)] opacity-30 rounded-full my-5'></div>
            </div>
          ))}
          <div>
            <div className=' flex justify-between items-center mb-5'>
              <span>Order Total</span>
              <span className=' font-bold text-3xl'>${grandTotal.toFixed(2)}</span>
            </div>

            <div className=' bg-[hsl(13,31%,94%)] w-full h-12 flex justify-center items-center gap-2 rounded-xl mb-5 '>
              <Image
                src={icon_carbonNeutral}
                alt='carbon neutral icon'
              />
              <p>
                This is a <span className=' font-semibold'>carbon-neutral</span> delivery
              </p>
            </div>

            {/* mobile checkout with shadcn drawer */}
            <div className=' md:hidden'>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  className=' h-12 w-full bg-[hsl(14,86%,42%)] rounded-full text-lg'
                  >
                    Confirm Order
                  </Button>
                </DrawerTrigger>
                <DrawerContent className={cn('mb-10')}>
                  <div className=''>
                    <DrawerHeader>
                      <DrawerTitle>
                        <Image
                          src={icon_orderConfirmed}
                          alt='icon order confirmed'
                          className=' mb-5'
                        />
                        <p className=' text-5xl font-bold mb-1'>Order <br /> Confirmed</p>
                      </DrawerTitle>
                      <DrawerDescription className={cn('mb-3')}>We hope you enjoy your food!</DrawerDescription>
                    </DrawerHeader>
                    <div className=' bg-[hsl(13,31%,94%)] mx-5 p-5 rounded-lg mb-2.5'>
                      <ScrollArea className=' h-60'>
                        {cart.map((item, index) => (
                          <div key={index}>
                            <div className=' flex items-center justify-between'>
                              <div className=' flex gap-3'>
                                <Image
                                  src={item.image}
                                  alt='thumbnail'
                                  width={50}
                                  height={50}
                                  className=' rounded-lg'
                                />
                                <div className=" flex flex-col gap-1">
                                  <span className=' font-semibold truncate'>{item.name}</span>
                                  <div className=" flex gap-5">
                                    <span className=' text-[hsl(14,86%,42%)] font-semibold'>{item.quantity}x</span>
                                    <span className=' text-[hsl(12,20%,44%)]'>@{item.price.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>

                              <div >
                                <span className='font-semibold text-[hsl(14,65%,9%)]'>${item.total_price.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className=' h-[1px] w-full bg-[hsl(14,25%,72%)] opacity-30 my-5 rounded-full'></div>
                          </div>
                          
                        ))}
                      </ScrollArea>

                      <div className=' flex justify-between items-center mt-5'>
                        <span>Order Total</span>
                        <span className=' font-bold text-3xl'>${grandTotal.toFixed(2)}</span>
                      </div>

                    </div>

                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button
                          onClick={() => handleReset()}
                          className=' h-12 w-full bg-[hsl(14,86%,42%)] rounded-full text-lg z-50'
                        >
                          Start New Order
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            
            {/* desktop checkout with shadcn alert dialog */}
            <div className=' hidden md:block '>
              <AlertDialog>
                  <AlertDialogTrigger 
                    className={
                      cn(' h-12 w-full bg-[hsl(14,86%,42%)] text-white rounded-full text-lg hover:bg-[hsl(14,85%,32%)] cursor-pointer')
                    }
                  >
                    Confirm Order
                  </AlertDialogTrigger>
                  <AlertDialogContent className={cn('bg-[hsl(20,50%,98%)]')}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <Image
                          src={icon_orderConfirmed}
                          alt='icon order confirmed'
                          className=' mb-5'
                        />
                        <p className=' text-5xl font-bold mb-1'>Order Confirmed</p>
                      </AlertDialogTitle>
                      <AlertDialogDescription>We hope you enjoy your food!</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className=' bg-[hsl(13,31%,94%)] p-5 rounded-lg mb-2.5'>
                      <ScrollArea className=' h-60'>
                        {cart.map((item, index) => (
                          <div key={index}>
                            <div className=' flex items-center justify-between'>
                              <div className=' flex gap-3'>
                                <Image
                                  src={item.image}
                                  alt='thumbnail'
                                  width={50}
                                  height={50}
                                  className=' rounded-lg'
                                />
                                <div className=" flex flex-col gap-1">
                                  <span className=' font-semibold truncate'>{item.name}</span>
                                  <div className=" flex gap-5">
                                    <span className=' text-[hsl(14,86%,42%)] font-semibold'>{item.quantity}x</span>
                                    <span className=' text-[hsl(12,20%,44%)]'>@{item.price.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>

                              <div >
                                <span className='font-semibold text-[hsl(14,65%,9%)]'>${item.total_price.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className=' h-[1px] w-full bg-[hsl(14,25%,72%)] opacity-30 my-5 rounded-full'></div>
                          </div>

                        ))}
                      </ScrollArea>

                      <div className=' flex justify-between items-center mt-5'>
                        <span>Order Total</span>
                        <span className=' font-bold text-3xl'>${grandTotal.toFixed(2)}</span>
                      </div>

                    </div>
                    <AlertDialogFooter>

                      <Button
                        onClick={() => handleReset()}
                        className=' h-12 w-full bg-[hsl(14,86%,42%)] rounded-full text-lg z-50'
                      >
                        Start New Order
                      </Button>

                    </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
