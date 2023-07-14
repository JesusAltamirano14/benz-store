"use client"
import CartEmpty from '@/components/CartEmpty';
import ProductCart from '@/components/ProductCart';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ItemsOrderClient } from '@/types/order';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { disableAnimateCart, emptyCart } from '@/redux/features/cartSlice';
import {motion} from 'framer-motion';

const Cart = () => {
  const productsCart = useAppSelector(state=>state.cartReducer.products);
  const dispatch = useAppDispatch();

  const percentageTaxes = Number(process.env.NEXT_PUBLIC_TAX_RATE);
  const numberOfProductsCart = productsCart?.reduce((accumulator,p)=>(accumulator + p.quantity),0);
  const subTotal = productsCart?.reduce((accumulator,p) => (accumulator + p.quantity*p.price),0);
  const taxes = (percentageTaxes*(subTotal))/100;
  const total = subTotal + taxes;

  const router = useRouter();
  const pathname = usePathname();
  const HOST = process.env.NEXT_PUBLIC_HOST;

  const {data :session} = useSession();

  const [userData,setUserData] = useState<User | undefined>(undefined);
  const [errorData,setErrorData] = useState<string | undefined>(undefined);

  const handleClickCheckOut = async () => {

    const productsToOrder : Array<ItemsOrderClient> = productsCart.map(p=>{
      return{
        _id:p._id,
        size:p.size,
        quantity:p.quantity
      }
    })

    if(session){
      const responseData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          userId:session.user._id,
          itemsOrder:productsToOrder,
        })
      })
      const response = await responseData.json();
      if(!response.message){
        router.push('profile/orders');
        setErrorData(undefined);
        dispatch(emptyCart());
      }else{
        setErrorData(response.message);
      }
    }else{
      router.push(`/signin?p=${pathname}`)
    }

  }

  useEffect(()=>{
    dispatch(disableAnimateCart());
    const fetchData = async() => {
        const responseData1= await fetch(`${HOST}/api/user/${session?.user._id}`);
        const response1 = await responseData1.json();
        setUserData(response1);
    }
    if(session){
      fetchData();
    }
  },[session,HOST]);

  return (
    <div>
      {productsCart.length===0?<CartEmpty/>:(
        <div className='flex flex-col gap-4 w-11/12 mx-auto lg:w-8/12 lg:flex-row lg:gap-10 xl:gap-36 lg:jutify-start lg:items-start'>
          <div className='flex flex-col gap-4 lg:w-[60%]'>
            <h1 className='text-2xl'>Cart</h1>
            <div className='flex flex-col gap-4 border-y-2 py-4'>
            {productsCart?.map((product)=>(<ProductCart key={product._id + product.size} product={product} disable={false}/>))}
            </div>
          </div>
          <div className='flex flex-col gap-3 lg:w-[40%] lg:rounded-md lg:shadow-black/30 lg:p-4 xl:gap-8 lg:shadow-lg '>
            <div className='flex justify-end'>
              <h1 className='text-xl'>Order Summary</h1>
            </div>
            <>{userData?.address?(
              <div className='flex flex-col gap-2 font-extralight text-slate-600 '>
                <h1 className='font-normal text-black'>Direccion de entrega</h1>
                <h2>{userData.address?.country}</h2>
                <div className='flex gap-2'>
                  <span>{userData.address?.city},</span>
                  <span>{userData.address?.state}</span>
                </div>  
                <h2>{userData.address?.address}</h2>
                {userData.phone?(
                <div className='flex gap-2'>
                  <span>phone:</span>
                  <span>{userData.phone}</span>
                </div>
                ):null}
                <hr></hr>
              </div>
            ):null}</>
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
            <motion.button whileHover={{scale:1.02, transition:{repeat:Infinity,repeatType:"reverse",duration:0.3}}} whileTap={{scale:0.95}} className='bg-indigo-400 h-10 rounded-sm text-white active:scale-105' onClick={handleClickCheckOut}>Check out</motion.button>
            {errorData?(<div className='text-red-400 text-sm'>{errorData}</div>):null}  
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart