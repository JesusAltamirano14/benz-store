'use client'
import { Address, User } from '@/types/user'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import {FiPlus} from 'react-icons/fi';
import { useSession } from 'next-auth/react'
import {VscClose} from 'react-icons/vsc';


interface AddressFormProps {
    _id:string | undefined,
}

const ContactForm = ({_id}:AddressFormProps) => {

    const {data:session} = useSession();
    const [showContentPhone,setShowContentPhone] = useState<boolean>(false);
    const [errorResponseData,setErrorResponseData] = useState<string|undefined>(undefined);

    const [refreshData,setRefreshData] = useState<boolean>(false);
    const HOST = process.env.NEXT_PUBLIC_HOST;

    const [userData,setUserData] = useState<User>({
        _id     :'',
        name    :'',
        email   :'',
        password:'',
        address:{
            country:'',
            city:'',
            address:'',
            codezip:'',
            state:'',
        },
        phone   :'',
    })
    
    const {register,reset,handleSubmit,formState:{errors} } = useForm<{phone:string}>();

    useEffect(()=>{
        const fetchData = async() => {
            const responseData1= await fetch(`${HOST}/api/user/${_id}`);
            const response1 = await responseData1.json();
            setUserData(response1);
        }
        fetchData();
    },[session,refreshData,HOST,_id]);

    const handleClickContactForm : SubmitHandler<{phone:string}> = async (data) => {
        setShowContentPhone(false);

        const responseData = await fetch(`${HOST}/api/user/phone/${_id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const response = await responseData.json();
        if(response.message){
            setErrorResponseData(response.message);
        }else{
            setErrorResponseData(undefined);
            reset();
            setRefreshData(prevState=>!prevState);
        }
    }

  return (
    <>
    <div className='flex flex-col gap-2'>
                    <h2 className='text-slate-700 font-semibold'>Contact number</h2>
                    {userData.phone?(
                    <div className='text-slate-500 flex flex-col gap-1'>
                        <div>{userData.phone}</div>
                        <div className='underline underline-offset-2 text-black cursor-pointer' onClick={()=>{setShowContentPhone(true)}}>Edit</div>
                    </div>):
                    (<div className='flex justify-start gap-2 items-center cursor-pointer' onClick={()=>{setShowContentPhone(true)}}>
                        <div className='rounded-full bg-gray-300 p-1'>
                            <FiPlus className='w-4 h-4'/>
                        </div>
                        <h1>Add new</h1>
                    </div>)}
                </div>

    <div 
    className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-600/40 backdrop-blur-sm duration-300 z-40 ${showContentPhone?'':'hidden'}`}
    onClick={()=>{setShowContentPhone(false)}}
    >
    </div>
    <div className={`bg-white fixed right-0 top-0 h-screen z-40 transition-all duration-500 ${showContentPhone?'w-[80%] xl:w-[28%]':'w-0 overflow-hidden'}`}>
        <div className='w-[86%] mt-8 mx-auto flex flex-col gap-4'>
            <div className="flex justify-end">
                <VscClose className="w-6 h-6 cursor-pointer text-slate-600" onClick={()=>{setShowContentPhone(false)}} />
            </div>
            <h1 className='text-xl font-semibold'>{userData.phone?'Change Phone Number':'Add Phone Number'}</h1>
            <form onSubmit={handleSubmit(handleClickContactForm)} className='flex flex-col gap-4'>
                <div className='flex flex-col items-start gap-2'>
                    <label>Contact Phone Number</label>
                    <input className='h-10 bg-gray-100 border-2 w-full border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200' maxLength={15} {...register('phone',{
                        required:'Phone is required',
                        minLength:{
                            value:9,
                            message:`Phone's length must be more than 9 digits`
                        },
                        maxLength:{
                            value:15,
                            message:`Phone's length must be less than 15 digits`
                        }
                    })} 
                    />
                    {errors.phone?(<div className='text-sm text-red-400'>{errors.phone.message}</div>):null} 
                </div>
                <input type='submit' value={`${userData.phone?'edit':'send'}`} className='h-10 bg-indigo-300 text-white text-md mt-2 rounded-md xl:mt-4' /> 
            </form>
        </div>
    </div>
    </>

  )
}

export default ContactForm