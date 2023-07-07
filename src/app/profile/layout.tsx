
import NavbarProfile from '@/components/profile/NavbarProfile'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <section className='w-full grid xl:grid-cols-12'>
        <div className='xl:col-span-3'>
          <NavbarProfile/>
        </div> 
        <div className='mt-8 xl:col-span-9 xl:justify-start xl:mt-20'>
            {children}
        </div>
    </section>
  )
}

export default layout