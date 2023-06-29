"use client"
import CartEmpty from '@/components/CartEmpty';
import ProductCart from '@/components/ProductCart';
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

const Cart = () => {
  const productsCart = useAppSelector(state=>state.cartReducer.products);

  const percentageTaxes = 15;
  const numberOfProductsCart = productsCart?.reduce((accumulator,p)=>(accumulator + p.quantity),0);
  const subTotal = productsCart?.reduce((accumulator,p) => (accumulator + p.quantity*p.price),0);
  const taxes = (percentageTaxes*(subTotal))/100;
  const total = subTotal + taxes;

  return (
    <div>
      {productsCart.length===0?<CartEmpty/>:(
        <div className='flex flex-col gap-4 w-11/12 mx-auto lg:w-8/12 lg:flex-row lg:gap-10 xl:gap-36 lg:jutify-start lg:items-start'>
          <div className='flex flex-col gap-4 lg:w-[60%]'>
            <h1 className='text-2xl'>Cart</h1>
            <div className='flex flex-col gap-4 border-y-2 py-4'>
            {productsCart?.map((product)=>(<ProductCart key={product._id+product.size} product={product}/>))}
            </div>
          </div>
          <div className='flex flex-col gap-3 lg:w-[40%] lg:rounded-md lg:shadow-black/30 lg:p-4 xl:gap-8 lg:shadow-lg'>
            <h1 className='text-xl'>Order Summary</h1>
            <div className='flex flex-col gap-2 font-extralight text-slate-600'>
              <ul className='flex justify-between'>
                <li>No. products</li>
                <li>{numberOfProductsCart>1?`${numberOfProductsCart} products`:`${numberOfProductsCart} product`}</li>
              </ul>
              <ul className='flex justify-between'>
                <li>Subtotal</li>
                <li>${subTotal}</li>
              </ul>
              <ul className='flex justify-between'>
                <li>{`Sales Taxes (${percentageTaxes}%)`}</li>
                <li>${taxes}</li>
              </ul>
              <ul className='flex justify-between text-black font-semibold'>
                <li>Total</li>
                <li>${total}</li>
              </ul>
            </div>
            <button className='bg-indigo-400 h-10 rounded-sm text-white active:scale-105'>Check out</button>  
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart