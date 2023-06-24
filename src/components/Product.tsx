import { SeedProductDataBase } from '@/types/product'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface ProductProps {
  product : SeedProductDataBase,
  disable:boolean,
}

const Product = ({product,disable} : ProductProps) => {

  const {title,images,price,_id,inStock} = product
  const url = `/products/${images[0]}`



  return (
    <Link href={`/products/${_id}`} className={`text-sm relative font-bold flex flex-col gap-2 rounded-md overflow-hidden ${disable?'pointer-events-none':''}`}>
        {inStock<=0?(<div className='absolute left-0 rounded-md py-1 px-[3px] font-light top-0 bg-slate-600 xl:text-xl xl:p-2 text-white'>out of Stock</div>):null}
        <div className='overflow-hidden w-full'>
          <Image src={url} alt={'imagens'} width={500} height={500} priority={true}/>
        </div>
        <div>
          <div>{title}</div>
          <div>${price}</div>
        </div>
    </Link>
  )
}

export default Product