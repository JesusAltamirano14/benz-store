'use client'
import { Address, ChangePassword, User } from '@/types/user'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import {FiPlus} from 'react-icons/fi';
import {VscClose} from 'react-icons/vsc';
import {AiOutlineEye} from 'react-icons/ai'
import {AiOutlineEyeInvisible} from 'react-icons/ai'


interface AddressFormProps {
    _id:string | undefined,
}

const PasswordForm = ({_id}:AddressFormProps) => {

    const HOST = process.env.NEXT_PUBLIC_HOST;

    const [showContentPassword,setShowContentPassword] = useState<boolean>(false);
    const [errorResponseData,setErrorResponseData] = useState<string|undefined>(undefined);

    const [showPassword1,setShowPassword1] = useState<boolean>(false);
    const [showPassword2,setShowPassword2] = useState<boolean>(false);    
    const [showPassword3,setShowPassword3] = useState<boolean>(false);    

    const {register,reset,handleSubmit,formState:{errors} } = useForm<ChangePassword>();

    const handleClickContactForm : SubmitHandler<ChangePassword> = async (data) => {
        console.log(data);
        const responseData = await fetch(`${HOST}/api/user/password/${_id}`,{
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
            setShowContentPassword(false);
        }
    }

  return (
    <>
    <div className='flex gap-2 xl:flex-col w-full'>
        <div className='flex flex-col gap-2'>
            <h2 className='text-slate-700 font-semibold'>Password</h2>
            <h2 className='text-slate-500 text-xl'>****************</h2>
        </div>
        <div className='flex w-full justify-end xl:justify-start'>
            <h2 className='cursor-pointer underline underline-offset-4 hover:text-blue-400' onClick={()=>{setShowContentPassword(true)}} >Change Password</h2>
        </div>            
    </div>
    <div 
    className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-600/40 backdrop-blur-sm duration-300 z-40 ${showContentPassword?'':'hidden'}`}
    onClick={()=>{setShowContentPassword(false)}}
    >
    </div>
    <div className={`bg-white fixed right-0 top-0 h-screen z-40 transition-all duration-500 ${showContentPassword?'w-[80%] xl:w-[28%]':'w-0 overflow-hidden'}`}>
        <div className='w-8/12 mt-8 mx-auto flex flex-col gap-4'>
            <div className="flex justify-end">
                <VscClose className="w-6 h-6 cursor-pointer text-slate-600" onClick={()=>{setShowContentPassword(false)}} />
            </div>
            <h1 className='text-xl font-semibold'>Change Password</h1>
            <form onSubmit={handleSubmit(handleClickContactForm)} className='flex flex-col gap-4'>
                <div className='flex flex-col items-start gap-2'>
                    <label>Password</label>
                    <div className='bg-gray-100 w-full flex items-center h-10 border-2 px-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md'>
                        <input className='bg-gray-100 w-full h-full focus:outline-none focus:border-gray-200' maxLength={25} type={`${showPassword1?'text':'password'}`}
                        {...register('previousPassword',{
                            required:'Password is required',
                        })} 
                        />
                        {showPassword1?
                        (<AiOutlineEyeInvisible onClick={()=>{setShowPassword1(false)}} className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>):
                        (<AiOutlineEye onClick={()=>{setShowPassword1(true)}}  className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>)}
                    </div>
                    {errors.previousPassword?(<div className='text-sm text-red-400'>{errors.previousPassword.message}</div>):null} 
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <label>New password</label>
                    <div className='bg-gray-100 w-full flex items-center h-10 border-2 px-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md'>
                        <input className='bg-gray-100 w-full h-full focus:outline-none focus:border-gray-200' maxLength={25} type={`${showPassword2?'text':'password'}`}
                        {...register('newPassword1',{
                            required:'Password is required',
                            minLength:{
                                value:5,
                                message:'password must be more than 5 characters'
                              },
                              maxLength:{
                                value:20,
                                message:'password must be less than 20 characters'
                              }
                        })} 
                        />
                        {showPassword2?
                        (<AiOutlineEyeInvisible onClick={()=>{setShowPassword2(false)}} className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>):
                        (<AiOutlineEye onClick={()=>{setShowPassword2(true)}}  className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>)}
                    </div>
                    {errors.newPassword1?(<div className='text-sm text-red-400'>{errors.newPassword1.message}</div>):null} 
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <label>Confirm password</label>
                    <div className='bg-gray-100 w-full flex items-center h-10 border-2 px-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md'>
                        <input className='bg-gray-100 w-full h-full focus:outline-none focus:border-gray-200' maxLength={25} type={`${showPassword3?'text':'password'}`}
                        {...register('newPassword2',{
                            required:'Password is required',
                            minLength:{
                                value:5,
                                message:'password must be more than 5 characters'
                              },
                              maxLength:{
                                value:20,
                                message:'password must be less than 20 characters'
                              }
                        })} 
                        />
                        {showPassword3?
                        (<AiOutlineEyeInvisible onClick={()=>{setShowPassword3(false)}} className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>):
                        (<AiOutlineEye onClick={()=>{setShowPassword3(true)}}  className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>)}
                    </div>
                    {errors.newPassword2?(<div className='text-sm text-red-400'>{errors.newPassword2.message}</div>):null} 
                </div>
                <input type='submit' value={'change'} className='h-10 bg-indigo-300 text-white text-md mt-2 rounded-md xl:mt-4 active:scale-105' /> 
            </form>
            {errorResponseData?(<div className='text-sm text-red-400'>{errorResponseData}</div>):null}
        </div>
    </div>
    </>

  )
}

export default PasswordForm