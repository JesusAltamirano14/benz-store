
"use client"
import { changeFilter } from "@/redux/features/stateSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {HiOutlineSearch} from 'react-icons/hi'; 
import {VscClose} from 'react-icons/vsc';
import {IoCartOutline} from 'react-icons/io5';
import {CgProfile} from "react-icons/cg";
import {MdNavigateNext} from 'react-icons/md';
import {IoTicketOutline} from 'react-icons/io5';
import {PiSignOut} from 'react-icons/pi';
import {GoSignIn} from 'react-icons/go';
import {GiClothes} from 'react-icons/gi';

import storeLogo from '../../public/products/logo.png'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { changeCodeMainButton } from "@/redux/features/codeMainSlice";
import { usePathname } from "next/navigation";

const Navbar = () => {

    const dispatch = useAppDispatch();

    const {data:session} = useSession();

    const productsCart = useAppSelector(state=>state.cartReducer.products);
    const router = useRouter();
    const pathname = usePathname();

    const [showContent,setShowContent] = useState<boolean>(false);
    const [showApparel,setShowApparel] = useState<boolean>(false);
    const [search,setSearch] = useState<string>('');
    const numberOfProductsCart = productsCart?.reduce((accumulator,p)=>(accumulator + p.quantity),0);

    const handleClickButton : React.MouseEventHandler<HTMLButtonElement> = (e) => {
        router.push('/')
        const val = e.currentTarget.value;
        if(val==='all'||val==='men'||val==='women'||val==='kid'||val==='unisex'){
            dispatch(changeFilter(val))
        }
        setShowContent(false)
        setShowApparel(false)
    }

    const handleClickSignIn:React.MouseEventHandler<HTMLHeadingElement> = () => {
        router.push(`/signin?p=${pathname}`);
        setShowContent(false)
    }
    
    const handleClickProfile:React.MouseEventHandler<HTMLHeadingElement> = () => {
        dispatch(changeCodeMainButton('profile'));
        router.push(`/profile/account`);
        setShowContent(false);
    }

    const handleClickOrders = () => {
        dispatch(changeCodeMainButton('orders'));
        router.push(`/profile/orders/${session?.user._id}`);
        setShowContent(false);
    }

    const handleSearchClickOrEnter = () => {
        if(!(search.length===0)){
            setShowContent(false);
            router.push(`/search/${search}`)
            setSearch('')
        }
    }

  return (
        <div className="h-14 w-screen fixed bg-white pl-6 flex justify-between items-center z-30">
            <Link href={'/'} className="w-20 xl:w-28">
                <Image src={storeLogo} alt="" priority={true}/>
            </Link>
            <div 
            className={`top-0 fixed bg-gray-600/40 backdrop-blur-sm duration-300 h-screen right-0 left-0 transition-all ${showContent?'':'hidden'}`}
            onClick={()=>{setShowContent(false)}}
            >
            </div>
            <div className={`bg-white transition-all duration-500 fixed right-0 top-0 h-screen flex flex-col items-center z-20 ${showContent?'w-[86%] sm:w-[50%] md:w-[50%] lg:w-[40%] xl:w-[26%]':'w-0 overflow-hidden'}`}>   
                <div className="w-10/12  mt-8 flex flex-col gap-4"> 
                    <div className="flex justify-end">
                    <VscClose className="w-6 h-6 cursor-pointer text-slate-600" onClick={()=>{setShowContent(false)}} />
                    </div>
                    <div className="bg-gray-100 h-10 flex w-full items-center rounded-sm border border-slate-200 p-2 gap-2">
                        <HiOutlineSearch onClick={()=>{handleSearchClickOrEnter()}} className="w-6 h-6 text-slate-600"/>
                        <input onKeyUp={(e)=>{e.key === 'Enter'?handleSearchClickOrEnter():null}} className="w-full h-full bg-gray-100 focus:outline-none" type="text" placeholder="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <div onClick={()=>{setShowApparel(prevState=>!prevState)}} className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-3">
                                <GiClothes className='w-5 h-5 text-slate-600'/>
                                <span>Apparel</span>
                            </div>
                            <MdNavigateNext className="w-5 h-5 text-slate-600"/>
                        </div>
                        <div className={`w-full flex justify-end transition-all duration-300 ${showApparel?'h-48':'h-0'}`}>
                            <div className={`overflow-hidden flex w-11/12 flex-col items-start justify-start gap-4 my-4`}>
                                <button onClick={handleClickButton} value={'all'} >All             </button>
                                <button onClick={handleClickButton} value={'men'} >Men             </button>
                                <button onClick={handleClickButton} value={'women'}>Women          </button>
                                <button onClick={handleClickButton} value={'kid'} >Kids           </button>
                                <button onClick={handleClickButton} value={'unisex'}>Unisex        </button>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    {session?(
                        <div className="flex flex-col items-start gap-4 xl:gap-6">
                            <h3 className="flex items-center gap-3 cursor-pointer" onClick={handleClickProfile}>
                                <CgProfile className="w-5 h-5 text-slate-600"/>
                                <span>{session.user?.name}</span>
                            </h3>
                            <h3 className="flex items-center gap-3 cursor-pointer" onClick={handleClickOrders}>
                                <IoTicketOutline className="w-5 h-5 text-slate-600"/>
                                <span>Mis ordenes</span>
                            </h3>
                            <h3 className="flex justify-start items-center gap-3 cursor-pointer" onClick={()=>{signOut()}}>
                                <PiSignOut className="w-5 h-5 text-slate-600"/>
                                <span>Sign out</span>
                            </h3>
                        </div>
                    ):(
                        <h3 className="flex items-center gap-3 cursor-pointer" onClick={handleClickSignIn}>
                            <GoSignIn className="w-5 h-5 text-slate-600"/>
                            <span>Sign in</span>
                        </h3>
                    )}
                </div>
            </div>
            <div className="mr-6 flex gap-5 items-center">
                <div className="hidden bg-gray-100 h-10 w-64 lg:flex items-center rounded-sm border border-slate-200 p-2 gap-2">
                    <HiOutlineSearch onClick={()=>{handleSearchClickOrEnter()}} className="w-6 h-6 text-slate-600"/>
                    <input onKeyUp={(e)=>{e.key === 'Enter'?handleSearchClickOrEnter():null}} className="w-full h-full bg-gray-100 focus:outline-none" type="text" placeholder="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
                </div>
                <div onClick={()=>{router.push('/cart')}} className="relative cursor-pointer active:scale-110">
                    <IoCartOutline className="w-6 h-6"/>
                    <div className="absolute -right-1 -top-1 bg-indigo-400 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs z-10">{numberOfProductsCart}</div>
                </div>
                <button className="" onClick={()=>{setShowContent(true)}}>Menu</button>
            </div>
        </div>
  )
}

export default Navbar

