"use client"
import AddressForm from '@/components/profile/account/AddresForm';
import { changeCodeMainButton } from '@/redux/features/codeMainSlice';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';
import {FiPlus} from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import ContactForm from '@/components/profile/account/ContactForm';
import PasswordForm from '@/components/profile/account/PasswordForm';


const Account = () => {

    const { data :session} = useSession()
    const dispatch = useAppDispatch();
    const HOST = process.env.NEXT_PUBLIC_HOST;

    useEffect(()=>{
        dispatch(changeCodeMainButton('profile'))
    },[])

    const handleClickDeleteAccount = async() => {
        const responseData = await fetch(`${HOST}/api/user/delete/${session?.user._id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }); 
        const response = await responseData.json();
        if(!response.message){
            signOut();
        }
    }

  return (
    <>
    <div className='bg-white w-10/12 mx-auto xl:w-full'>
        <div className='xl:w-8/12 flex flex-col gap-4 xl:gap-8 justify-start'>
            <section className='hidden font-semibold text-xl xl:block xl:text-2xl'>Profile Settings</section>
            <section className='flex flex-col items-start gap-8  xl:flex-row'>
                <div className='flex justify-between w-full  xl:flex-col xl:gap-2'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-slate-700 font-semibold'>Full Name</h2>
                        <h2 className='text-slate-500'>{session?.user.name}</h2>
                    </div>
                    {/* <h1 className='underline underline-offset-2'>Edit</h1> */}
                </div>
                <div className='flex justify-between w-full'>
                    <AddressForm _id={session?.user._id}/>   
                </div>
                <div className='flex justify-between w-full'>
                    <ContactForm _id={session?.user._id}/>
                </div>
            </section>
            <section className='text-xl font-semibold xl:text-2xl'>Security</section>
            <section className='flex flex-col items-start gap-8 xl:flex-row'>
                <div className='flex justify-between w-full'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-slate-700 font-semibold'>Email</h2>
                        <h2 className='text-slate-500'>{session?.user.email}</h2>
                    </div>   
                </div>
                <div className='flex justify-between w-full xl:flex-col xl:gap-2'>
                    <PasswordForm _id={session?.user._id}/>
                </div>
            </section>
            <div className='flex justify-start'>
                <div className='underline underline-offset-2 cursor-pointer hover:text-blue-500' onClick={handleClickDeleteAccount}>Delete Account</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Account