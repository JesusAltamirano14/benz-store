'use client'
import { User } from '@/types/user'
import React, { useState } from 'react'
import {useForm,SubmitHandler} from 'react-hook-form'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {AiOutlineEye} from 'react-icons/ai'
import {AiOutlineEyeInvisible} from 'react-icons/ai'

import {signIn} from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

const SignIn = () => {

  const router = useRouter();
  const {register,handleSubmit,formState:{errors},reset} = useForm<User>()
  const [errorResponseData,setErrorResponseData] = useState<string | undefined>(undefined)
  const [showPassword,setShowPassword] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathnameRecieved = searchParams.get('p');

  const handleSubmitPrimary:SubmitHandler<User> = async (data) => {
    const responseAuth = await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })
    if(responseAuth?.error){
      setErrorResponseData(responseAuth.error);
    }else{
      setErrorResponseData(undefined);
      reset();
      router.push(`${pathnameRecieved?pathnameRecieved:'/'}`)
    }
  } 

  return (
    <div className=' w-10/12 mx-auto flex flex-col gap-6 mt-12 xl:w-3/12 xl:gap-10'>
      <h1 className='text-2xl font-semibold'>Sign In</h1>
      <form onSubmit={handleSubmit(handleSubmitPrimary)} className='flex flex-col gap-4 xl:gap-6'>
        <h2 className='flex flex-col gap-2'>
          <label htmlFor='email'>Email</label>
          <input className='h-10 bg-gray-100 border-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200' id='email' type='email' {...register('email',{
            required:'email is required',
            pattern:{
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message:'insert an correct email'
            }
          })}/>
          {errors.email?(<div className='text-sm text-red-400'>{errors.email.message}</div>):null}
        </h2>
        <h2 className='flex flex-col gap-2'>
          <label htmlFor='password'>Password</label>
          <div className='bg-gray-100 flex items-center h-10 border-2 px-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md'>
            <input className='bg-gray-100 w-full h-full focus:outline-none focus:border-gray-200' id='password' type={`${showPassword?'text':'password'}`} {...register('password',{
              required:'password is required',
              minLength:{
                value:5,
                message:'password must be more than 5 characters'
              },
              maxLength:{
                value:20,
                message:'password must be less than 20 characters'
              }
            })} />
           {showPassword?
            (<AiOutlineEyeInvisible onClick={()=>{setShowPassword(false)}} className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>):
            (<AiOutlineEye onClick={()=>{setShowPassword(true)}}  className='flex justify-center items-center w-6 h-6 cursor-pointer text-slate-600'/>)}
          </div>
          {errors.password?(<div className='text-sm text-red-400'>{errors.password.message}</div>):null}
        </h2>
        {/* <div className='flex justify-end'>
          <Link href={'/changepassword'} className='text-sm underline underline-offset-4 hover:text-blue-300'>Forgot password?</Link>
        </div> */}
        <input className='h-10 bg-indigo-300 text-white text-md rounded-md mt-2 xl:mt-4  hover:bg-indigo-400 cursor-pointer active:scale-105' type='submit' value={'Sign In'}/>
        {errorResponseData?(<div className='text-red-400 text-sm'>{errorResponseData}</div>):null}
      </form>
      <hr></hr>
      <div>
          <Link className='bg-white border-2 border-black w-full h-10 rounded-md text-black text-sm font-bold flex justify-center items-center hover:bg-black hover:text-white' href={'/signup'}>Create account</Link>
      </div>
    </div>
  )
}

export default SignIn