'use client'
import { User } from '@/types/user'
import React, { useState } from 'react'
import {useForm,SubmitHandler} from 'react-hook-form'
import {useRouter} from 'next/navigation'

const SignUp = () => {

  const router = useRouter();
  const {register,handleSubmit,formState:{errors},reset} = useForm<User>()
  const [errorResponseData,setErrorResponseData] = useState<string | undefined>(undefined)

  const handleSubmitPrimary:SubmitHandler<User> = async (data) => {


    const options = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }
    try {
      const responseData = await fetch('http://localhost:3000/api/auth/register',options);
      const response = await responseData.json()
      if(response.message){
        setErrorResponseData(response.message);
      }else{
        setErrorResponseData(undefined);
        reset();
        router.push('/signin')
      }
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div className=' w-10/12 mx-auto flex flex-col gap-6 mt-12 xl:w-3/12 xl:gap-10'>
      <h1 className='text-2xl font-semibold'>Create Account</h1>
      <form onSubmit={handleSubmit(handleSubmitPrimary)} className='flex flex-col gap-4 xl:gap-6' >
        <h2 className='purple-500 flex flex-col gap-2'>
          <label htmlFor='name' >Name</label>
          <input className='h-10 bg-gray-100 border-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200' id='name' type='text' {...register('name',{
            required:'name is required',
            minLength:{
              value:5,
              message:'name must be more than 5 characters'
            },
            maxLength:{
              value:15,
              message:'name must be less than 15 characters'
            }
          })}/>
          {errors.name?(<div className='text-sm text-red-400'>{errors.name.message}</div>):null}
        </h2>
        <h2 className='purple-500 flex flex-col gap-2'>
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
        <h2 className='purple-500 flex flex-col gap-2'>
          <label htmlFor='password'>Password</label>
          <input className='h-10 bg-gray-100 border-2 border-gray-100 transition-colors text-slate-600 duration-300 rounded-md p-2 focus:outline-none focus:border-gray-200' id='password' type='password' {...register('password',{
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
          {errors.password?(<div className='text-sm text-red-400'>{errors.password.message}</div>):null}
        </h2>
      <input className='h-10 bg-indigo-300 text-white text-md rounded-md xl:mt-8' type='submit' value={'send'}/>
      {errorResponseData?(<div className='text-red-400 text-sm'>{errorResponseData}</div>):null}
      </form>
    </div>
  )
}

export default SignUp