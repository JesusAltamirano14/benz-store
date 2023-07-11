'use client'
import { changeCodeMainButton } from '@/redux/features/codeMainSlice';
import { useAppDispatch } from '@/redux/hooks'
import { OrderData } from '@/types/order';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Orders = () => {

    const dispatch = useAppDispatch();
    const HOST = process.env.NEXT_PUBLIC_HOST;

    const {data:session} = useSession();

    const [ordersData,setOrdersData] = useState<OrderData[]>([]);


    useEffect(()=>{
        dispatch(changeCodeMainButton('orders'));
        
        const fetchData = async () => {
          const responseData = await fetch(`${HOST}/api/orders/total/${session?.user._id}`);
          const response = await responseData.json();
          if(!(response.message)){
            setOrdersData(response);
          }

        }
        if(session){
          fetchData();
        }

    },[session,HOST,dispatch]);

  return (
    <div className='w-10/12 mx-auto xl:w-full'>
      {ordersData.length<=0?(
        <div className='flex flex-col gap-4 justify-start items-start '>
          <div className='text-lg font-medium'>There are not orders yet</div>
          <Link className='bg-indigo-300 w-full h-10 rounded-md text-white text-sm flex justify-center items-center xl:w-48 active:scale-105' href={'/'}>Continue Shopping ...</Link>
        </div>
      ):(
        <div className=' text-sm xl:w-10/12  xl:mx-auto border-slate-300 border-2 rounded-md px-2'>
          <div>
            <section className='grid grid-cols-12 py-3 xl:py-3 font-semibold'>
              <div className='col-span-1'>ID</div>
              <div className='col-span-4  border-slate-300 border-l-2 pl-1 '>Name</div>
              <div className='col-span-4 border-slate-300 border-l-2 pl-1 '>Paid</div>
              <div className='col-span-3 border-slate-300 border-l-2 pl-1 '>See order</div>
            </section>
            <hr></hr>
          </div>
            {ordersData?.map((order,index)=>(
              <div key={order._id}>
              <section className='grid grid-cols-12 w-full items-center py-3 xl:py-3 text-sm'>
                <div className='col-span-1'>{index+1}</div>
                <div className='col-span-4 pl-1'>{'jesus'}</div>
                {order.isPaid?
                  (<div className='col-span-4 flex justify-start items-center pl-1'>
                    <h2 className='border-2 rounded-2xl text-green-400 p-1 border-green-400 '>paid</h2>
                  </div>):
                  (<div className='col-span-4 flex justify-start items-center pl-1'>
                    <h2 className='border-2 rounded-2xl text-red-400 p-1 border-red-400 '>not payed</h2>
                  </div>)}
                <Link className='col-span-3 pl-1 underline underline-offset-2 cursor-pointer hover:underline-offset-4' key={order._id} href={`/order/${order._id}`}>See order</Link>
              </section>
              <hr></hr>
              </div>
            ))}
      </div>
      )}
    </div>
  )
}

export default Orders