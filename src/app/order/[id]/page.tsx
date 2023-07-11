"use client"
import ProductCart from '@/components/ProductCart';
import React, { useEffect, useState } from 'react'; 
import { OrderData } from '@/types/order';

const OrderId = ({params}:{params:{id:string}}) => {

    const {id:_id} = params;

    const HOST = process.env.NEXT_PUBLIC_HOST;
    const [orderData,setOrderData] = useState<OrderData | undefined>(undefined)
    const percentageTaxes = Number(process.env.NEXT_PUBLIC_TAX_RATE);

    useEffect(()=>{

        const getOrderFromData = async () => {
            const responseData = await fetch(`${HOST}/api/orders/${_id}`);
            const response = await responseData.json();

            if(!response.message){
                setOrderData(response);
            }
        }

        getOrderFromData();

    },[HOST,_id]);

 

  return (
    <div>
        <div className='flex flex-col gap-4 w-11/12 mx-auto lg:w-8/12 lg:flex-row lg:gap-10 xl:gap-36 lg:jutify-start lg:items-start'>
          <div className='flex flex-col gap-4 lg:w-[60%]'>
            <h1 className='text-2xl'>Order: {_id}</h1>
            <div className='flex flex-col gap-4 border-y-2 py-4'>
            {orderData?.itemsOrder.map((product)=>(<ProductCart key={product._id + product.size} product={product} disable={true}/>))}
            </div>
          </div>
          <div className='flex flex-col gap-3 lg:w-[40%] lg:rounded-md lg:shadow-black/30 lg:p-4 xl:gap-8 lg:shadow-lg '>
            <div className='flex justify-end'>
              <h1 className='text-xl'>Order Summary</h1>
            </div>
            <>{orderData?.address?(
              <div className='flex flex-col gap-2 font-extralight text-slate-600 '>
                <h1 className='font-normal text-black'>Direccion de entrega</h1>
                <h2>{orderData.address?.country}</h2>
                <div className='flex gap-2'>
                  <span>{orderData.address?.city},</span>
                  <span>{orderData.address?.state}</span>
                </div>  
                <h2>{orderData.address?.address}</h2>
                {orderData.phone?(
                <div className='flex gap-2'>
                  <span>phone:</span>
                  <span>{orderData.phone}</span>
                </div>
                ):null}
                <hr></hr>
              </div>
            ):null}</>
            <div className='flex flex-col gap-2 font-extralight text-slate-600'>
              <ul className='flex justify-between'>
                <li>No. products</li>
                <li>{orderData?.numberProducts!>1?`${orderData?.numberProducts!} products`:`${orderData?.numberProducts!} product`}</li>
              </ul>
              <ul className='flex justify-between'>
                <li>Subtotal</li>
                <li>${orderData?.subTotal}</li>
              </ul>
              <ul className='flex justify-between'>
                <li>{`Sales Taxes (${percentageTaxes}%)`}</li>
                <li>${orderData?.taxes}</li>
              </ul>
              <ul className='flex justify-between text-black font-semibold'>
                <li>Total</li>
                <li>${orderData?.total}</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default OrderId