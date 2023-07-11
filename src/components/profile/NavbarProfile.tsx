"use client"
import React, { useState } from 'react'
import {FiCheck} from 'react-icons/fi';
import {CgProfile} from 'react-icons/cg';
import {IoTicketOutline} from 'react-icons/io5';
import {PiSignOut} from 'react-icons/pi';
import {FiChevronDown} from 'react-icons/fi';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeCodeMainButton } from '@/redux/features/codeMainSlice';

export type CodeType = 'profile' | 'orders' | 'signout'

export interface PrincipalButtonProfile {
    code:CodeType
    title:string,
    icon:React.JSX.Element,
}

const NavbarProfile = () => {

    const router = useRouter()

    const dispatch = useAppDispatch();
    const codeMainButton = useAppSelector(state=>state.codeMainReducer.code);

    const arrayButtons : Array<PrincipalButtonProfile> = [
        {code:'profile',title:'Profile Settings',icon:<CgProfile className='w-7 h-7'/>}
        ,{code:'orders',title:'Orders History',icon:<IoTicketOutline className='w-7 h-7'/>},
        {code:'signout',title:'Sign Out',icon:<PiSignOut className='w-7 h-7'/>}
    ]

    const [showContentNav,setShowContentNav] = useState<boolean>(false);

    const principalButton = arrayButtons.filter(p => (p.code === codeMainButton));

    const handleClickPrincipal = (code:string) : void => {
        switch (code) {
            case 'profile':
                dispatch(changeCodeMainButton('profile'));
                router.push('/profile/account')
                break;
            case 'orders':
                dispatch(changeCodeMainButton('orders'));
                router.push('/profile/orders')
                break;
            case 'signout':
                signOut();
                break;
        }
    }

  return (
    <>
        <div className='mt-10 flex justify-start items-center gap-3 text-xl font-semibold w-10/12 mx-auto md:hidden' onClick={()=>{setShowContentNav(true)}}>
            <h1 className='p-1 rounded-full bg-indigo-400 text-white'>{principalButton[0]?.icon}</h1>
            <h1>{principalButton[0]?.title}</h1>
            <h1><FiChevronDown className='w-6 h-6'/></h1>
        </div>
        <div className={`pt-24 bg-gray-200/40 backdrop-blur-md fixed top-0 left-0 w-screen h-screen text-xl z-30 
        ${showContentNav?null:'hidden xl:block xl:w-full xl:static xl:h-auto xl:bg-white'}`}
        onClick={()=>{setShowContentNav(false)}}>
            <div className='flex flex-col items-start gap-8 w-10/12 mx-auto font-semibold'>
            {arrayButtons.map((p,index) => (
                <div key={p.title} className='flex justify-start items-center gap-3 cursor-pointer' onClick={()=>{handleClickPrincipal(p.code)}}>
                    <h1 className={`${p.title===principalButton[0].title?'rounded-full bg-indigo-400 text-white':null} p-1`}>{p.icon}</h1>
                    <h1 className={`${p.title===principalButton[0].title?'text-indigo-400':null}`}>{p.title}</h1>
                </div>
            ))}
            </div>
        </div>
    </>
  )
}

export default NavbarProfile