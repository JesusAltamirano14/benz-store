
"use client"
import { changeFilter } from "@/redux/features/stateSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {HiOutlineSearch} from 'react-icons/hi'; 
import {VscClose} from 'react-icons/vsc';
import {IoCartOutline} from 'react-icons/io5';
import storeLogo from '../../public/products/logo.png'
import Image from "next/image";
import {MdNavigateNext} from 'react-icons/md';

const Navbar = () => {

    const dispatch = useAppDispatch();
    const productsCart = useAppSelector(state=>state.cartReducer.products);
    const router = useRouter();
    const [showContent,setShowContent] = useState<boolean>(false);
    const [showApparel,setShowApparel] = useState<boolean>(false);
    const numberOfProductsCart = productsCart?.reduce((accumulator,p)=>(accumulator + p.quantity),0);

    const handleClickButton : React.MouseEventHandler<HTMLButtonElement> = (e) => {
        router.push('/')
        const val = e.currentTarget.value;
        if(val==='all'||val==='men'||val==='women'||val==='kid'||val==='unisex'){
            dispatch(changeFilter(val))
        }
        setShowContent(false)
    }

  return (
    <div className="h-14 w-screen fixed bg-white z-30">
        <div className="pl-6 flex justify-between items-center h-full w-full relative">
            <Link href={'/'} className="w-20 xl:w-28">
                <Image src={storeLogo} alt="" priority={true}/>
            </Link>
            <div className="bg-green-500">
                <div 
                className={`top-0 fixed bg-gray-600/50 backdrop-blur-sm duration-300 h-screen right-0 left-0 transition-all xl:hidden ${showContent?'':'hidden'}`}
                onClick={()=>{setShowContent(false)}}
                ></div>
                <div className={`bg-white transition-all duration-500 fixed right-0 top-0 h-screen flex flex-col items-center z-20 ${showContent?'w-[86%]':'w-0 overflow-hidden'}`}>   
                    <div className="w-9/12  mt-8 flex flex-col gap-4">
                        <div className="flex justify-end">
                        <VscClose className="w-6 h-6" onClick={()=>{setShowContent(false)}} />
                        </div>
                        <div className="bg-gray-100 h-10 flex w-full items-center rounded-sm border border-slate-200 p-2">
                            <HiOutlineSearch onClick={()=>{console.log('search')}} className="w-6 h-6 mr-2"/>
                            <input className="w-full h-full bg-gray-100 focus:outline-none" type="text" placeholder="Search"></input>
                        </div>
                        <div className="flex flex-col items-start">
                            <div onClick={()=>{setShowApparel(prevState=>!prevState)}} className="flex w-full items-center justify-between">
                                <h1>Apparel</h1>
                                <MdNavigateNext className="w-5 h-5"/>
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
                            <div>Jesus</div>
                        </div>
                    </div>
                </div>
                <div className="hidden xl:block">
                    <button onClick={handleClickButton} value={'all'} >All             </button>
                    <button onClick={handleClickButton} value={'men'} >Men             </button>
                    <button onClick={handleClickButton} value={'women'}>Women          </button>
                    <button onClick={handleClickButton} value={'kid'} >Kids           </button>
                    <button onClick={handleClickButton} value={'unisex'}>Unisex        </button>
                </div>
            </div>
            <div className="mr-6 flex gap-5">
                <div className="relative active:scale-110">
                    <IoCartOutline onClick={()=>{router.push('/cart')}} className="w-6 h-6 cursor-pointer"/>
                    <div className="absolute -right-1 -top-1 bg-indigo-400 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs z-10">{numberOfProductsCart}</div>
                </div>
                <button className="xl:hidden" onClick={()=>{setShowContent(true)}}>Menu</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
