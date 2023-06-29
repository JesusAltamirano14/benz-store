import { addOneQuantity, deleteProductCart, removeOneQuantity } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { productCart } from '@/types/cart'
import Image from 'next/image'
import React, { useState } from 'react'
import {LiaMinusCircleSolid} from 'react-icons/lia';
import {LiaPlusCircleSolid} from 'react-icons/lia';

interface ProductCartProps {
    product:productCart
}

const ProductCart = ({product}:ProductCartProps) => {
    const dispatch = useAppDispatch();


    const{_id,title,image,size,quantity,price} = product;
    const [quantityCart,setQuantityCart] = useState<number>(quantity);

    const urlImage = `/products/${image}`

    const handleClickMinus:React.MouseEventHandler<HTMLOrSVGElement> = (e) => {
        if(quantity>=2){
            dispatch(removeOneQuantity(product))
        }
    }

    const handleClickPlus:React.MouseEventHandler<HTMLOrSVGElement> = (e) => {
        if(quantity<product.inStock &&quantity<=4){
            dispatch(addOneQuantity(product))
        }
    }

  return (
    <div className='grid grid-cols-10 gap-2 font-extralight'>
        <div className='col-span-3'>
            <Image src={urlImage} alt={'image'} width={500} height={500}/>
        </div>
        <div className='col-span-5 flex flex-col gap-2'>
            <h1 className='font-normal'>{title}</h1>
            <h2 className='text-slate-500 '>Talla: {size}</h2>
            <div className='flex justify-start items-center gap-3'>
                <LiaMinusCircleSolid onClick={handleClickMinus} className='w-5 h-5 active:scale-110'/>
                <h3 className=''>{quantity}</h3>
                <LiaPlusCircleSolid onClick={handleClickPlus} className='w-5 h-5 active:scale-110'/>
            </div>
        </div>
        <div className='col-span-2 flex flex-col items-end'>
            <h1 className='font-light'>${price}</h1>
            <button onClick={()=>{dispatch(deleteProductCart(product))}} className='text-sm underline underline-offset-4 hover:text-blue-500 cursor-default'>Remove</button>
        </div>
    </div>
  )
}

export default ProductCart