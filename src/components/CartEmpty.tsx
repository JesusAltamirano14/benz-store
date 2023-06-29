import Link from 'next/link'
import React from 'react'

const CartEmpty = () => {
  return (
    <div className=' text-2xl w-11/12 mx-auto flex flex-col gap-20 mb-20'>
      <div>Cart</div>
      <div className=' w-10/12 mx-auto flex flex-col gap-4'>
        <h1>Your cart is empty</h1>
        <div className='flex flex-col gap-3 xl:flex-row xl:w-7/12'>
          <Link className='bg-indigo-500 w-full h-10 rounded-md text-white text-sm flex justify-center items-center' href={'/'}>Continue Shopping</Link>
          <Link className='bg-white border-2 border-black w-full h-10 rounded-md text-black text-sm font-bold flex justify-center items-center' href={'/signin'}>Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default CartEmpty