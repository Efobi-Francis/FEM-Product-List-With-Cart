import { create } from 'zustand'

export type CartItem = {
    name: string,
    image: string,
    quantity: number,
    price: number,
    total_price: number,
}

export type CartState = {
    cart: CartItem[],
    addToCart: (item: CartItem)=> void
    removeFromCart: (item: CartItem)=> void
    deleteFromCart: (item: CartItem)=> void
    resetCart: ()=> void
}

export const useStore = create<CartState>((set)=> ({
  cart: [],

  addToCart:  (item)=> set((state)=> {
    const existingItem = state.cart.find((cartItem)=> cartItem.name === item.name)
    if(existingItem) {
      const updatedCart = state.cart.map((cartItem)=> {
        if(cartItem.name === item.name) {
          const updatedQuantity = cartItem.quantity + item.quantity
          return{
            ...cartItem,
            quantity: updatedQuantity,
            total_price: item.price * updatedQuantity 
          }
        }
        return cartItem
      })
      return {cart: updatedCart}
    } else {
      return {cart: [...state.cart, 
        {
          ...item, 
          name: item.name,
          quantity: item.quantity,
          total_price: item.total_price
        }]}
    }
  }),

  removeFromCart: (item)=> set((state)=> {
    const updatedCart = state.cart.map((cartItem)=> {
      if(cartItem.name === item.name) {
        const updatedQuantity = cartItem.quantity - item.quantity
        return{
          ...cartItem,
          quantity: updatedQuantity,
          total_price: item.price * updatedQuantity
        }
      }
      return cartItem
    })
    return {cart: updatedCart}
  }),

  deleteFromCart: (item) => set((state) => {
    const updatedCart = state.cart.filter((cartItem) => cartItem.name !== item.name)
    return { cart: updatedCart }
  }),

  resetCart: () => set(() => {
    // Clear the cart by setting it to an empty array
    return { cart: [] }
  }),

}))