'use client'
import { Address, User } from '@/types/user'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import {FiPlus} from 'react-icons/fi';
import { useSession } from 'next-auth/react'


interface AddressFormProps {
    _id:string | undefined,
}

const AddressForm = ({_id}:AddressFormProps) => {

    const {data:session} = useSession();
    const [showContentAddress,setShowContentAddress] = useState<boolean>(false);
    const [errorResponseData,setErrorResponseData] = useState<string|undefined>(undefined);
    const {register,reset,handleSubmit,formState:{errors} } = useForm<Address>();


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
    
    const handleClickAddressForm : SubmitHandler<Address> = async (data) => {
        setShowContentAddress(false);

        const responseData = await fetch(`${HOST}/api/user/address/${_id}`,{
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


    useEffect(()=>{
        const fetchData = async() => {
            const responseData1= await fetch(`${HOST}/api/user/${_id}`);
            const response1 = await responseData1.json();
            setUserData(response1);
        }
        fetchData();
    },[session,refreshData,HOST,_id])


  return (
    <>
    <div className='flex flex-col gap-2'>
                    <h2 className='text-slate-700 font-semibold'>Address</h2>
                    {userData.address?(
                    <div className='text-slate-500 flex flex-col gap-1'>
                        <div>{userData.address.country}</div>
                        <div className='flex gap-2'>
                            <span>{userData.address.city}, </span>
                            <span>{userData.address.state}</span>
                        </div>
                        <div>{userData.address.codezip}</div>
                        <div>{userData.address.address}</div>
                        <div className='underline underline-offset-2 text-black cursor-pointer' onClick={()=>{setShowContentAddress(true)}}>Edit</div>
                    </div>):
                    (<div className='flex justify-start gap-2 items-center cursor-pointer' onClick={()=>{setShowContentAddress(true)}}>
                        <div className='rounded-full bg-gray-300 p-1'>
                            <FiPlus className='w-4 h-4'/>
                        </div>
                        <h1>Add new</h1>
                    </div>)}
                </div>

    <div 
    className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-600/40 backdrop-blur-sm duration-300 z-40 ${showContentAddress?'':'hidden'}`}
    onClick={()=>{setShowContentAddress(false)}}
    >
    </div>
    <div className={`bg-white fixed left-0 bottom-0 rounded-t-2xl w-screen z-40 transition-all duration-500 ${showContentAddress?'h-[75%] xl:w-[50%] xl:left-1/4':'h-0 xl:w-[50%] xl:left-1/4 overflow-hidden'}`}>
        <div className='w-[86%] mt-8 mx-auto flex flex-col gap-4'>
            <h1 className='text-xl font-semibold'>{userData.address?'Change Address':'Add Address'}</h1>
            <form onSubmit={handleSubmit(handleClickAddressForm)} className='flex flex-col gap-4'>
                <div className='flex flex-col items-start gap-2'>
                    <label>Country</label>
                    <select className='h-10 bg-gray-100 w-full border-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200' {...register('country')}>
                        <option value={'PERU'}>Peru</option>   
                        <option value={'ARGENTINA'}>Argentina</option>
                        <option value={'MEXICO'}>Mexico</option>
                    </select>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <label>Address</label>
                    <input  maxLength={40} {...register('address',{
                        required:'Address is required',
                        maxLength:{
                            value:40,
                            message:`Address's length must be less than 40`
                        }
                    })}
                    className='h-10 bg-gray-100 border-2 w-full border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200'
                    />
                    {errors.address?(<div className='text-red-400 text-sm'>{errors.address.message}</div>):null}
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <label>City</label>
                    <input className='h-10 bg-gray-100 border-2 w-full border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200' maxLength={15} {...register('city',{
                        required:'City is required',
                        maxLength:{
                            value:15,
                            message:`City's length must be less than 15`
                        }
                    })} 
                    />
                    {errors.city?(<div className='text-red-400 text-sm'>{errors.city.message}</div>):null} 
                </div>
                <div className='grid grid-cols-2 gap-4 '>
                    <div className='col-span-1 flex flex-col gap-2'>
                        <label>State</label>
                        <input maxLength={15} {...register('state',{
                            required:'State is required',
                            maxLength:{
                                value:15,
                                message:`State's length must be less than 15`
                            }
                        })}
                        className='h-10 bg-gray-100 border-2 w-full border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200'
                        />
                        {errors.state?(<div className='text-red-400 text-sm'>{errors.state.message}</div>):null} 
                    </div>
                    <div className='col-span-1 flex flex-col gap-2'>
                        <label>Zip Code</label>
                        <input maxLength={6} {...register('codezip',{
                            required:'Zip code is required',
                            maxLength:{
                                value:6,
                                message:`Zip code's length must be less than 6`
                            }
                        })}
                        className='h-10 bg-gray-100 border-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200'
                        />
                        {errors.codezip?(<div className='text-red-400 text-sm'>{errors.codezip.message}</div>):null}
                    </div> 
                </div>
                <input type='submit' value={`${userData.address?'edit':'send'}`} className='h-10 bg-indigo-300 text-white text-md mt-2 rounded-md xl:mt-8' /> 
            </form>
        </div>
    </div>
    </>

  )
}

export default AddressForm