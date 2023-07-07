'use client'
import { changeCodeMainButton } from '@/redux/features/codeMainSlice';
import { useAppDispatch } from '@/redux/hooks'
import React, { useEffect } from 'react'

const Orders = () => {

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(changeCodeMainButton('orders'));
    },[])

  return (
    <div>Orders</div>
  )
}

export default Orders