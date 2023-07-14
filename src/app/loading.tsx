import React from 'react'

const Loading = () => {
  return (
    <div className="w-full">
        <div className="pt-10 grid grid-cols-2 justify-center gap-6 w-[86%] xl:grid-cols-3 xl:w-[95%] xl:gap-20 mx-auto"
        >
            {[1,2,3,4,5,6,7,8,9,10].map((product,index)=>(
            <div key={index} className='bg-white border-2 border-gray-200 col-span-1 flex items-center flex-col rounded-xl gap-2 py-4 xl:py-8'>
              <div className='w-10/12 h-24 rounded-lg xl:h-[450px] bg-gray-200'/>
              <div className='flex flex-col w-10/12 gap-4 '>
                <h1 className='w-9/12 h-3 rounded-lg xl:h-[22px]    bg-gray-200'/>
                <h1 className='w-7/12 h-3 rounded-lg xl:h-[22px]    bg-gray-200'/>
              </div>
              
            </div>))}
        </div>
    </div>
  )
}

export default Loading