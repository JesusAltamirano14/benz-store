"use client"
import { addProductCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetProductsByIdQuery } from "@/redux/services/productsApi";
import { ValidSizes } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

const pageId = ({params}:{params:{id:string}}) => {

    const {id} = params;
    const{data,error,isLoading,isFetching} = useGetProductsByIdQuery(id);

    const dispatch = useAppDispatch();

    const [selectedSize,setSelectedSize] = useState<ValidSizes|undefined>(undefined);
    const [quantity,setQuantity] = useState<number>(1);
    const [alertSize,setAlertSize] = useState<boolean>(false);

    const urlImg = `/products/${data?.images[0]}`
    const sizesTotal : ValidSizes[] = ['XS','S','M','L','XL','XXL','XXXL'];


    const handleClickSize:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const value = e.currentTarget.value as ValidSizes;
        setSelectedSize(value);
        setAlertSize(false);
        setQuantity(1);
    }

    const handleClickMinus:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if(quantity>1) setQuantity(prevState=>prevState-1);
    }

    const handleClickPlus:React.MouseEventHandler<HTMLButtonElement> = (e) => {

        if(data){
            if(quantity<data.inStock && quantity<=4){
                setQuantity(prevState=>prevState+1);
            }
        }
    }

    const handleClickAddProductCart:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if(data){
            if(selectedSize){
                dispatch(addProductCart({
                    _id:data._id,
                    title:data.title,
                    size:selectedSize,
                    quantity,
                    image:data.images[0],
                    price:data.price,
                    inStock:data.inStock
                }))
            }else{
                setAlertSize(true);
            }       
        }
    }

  return (
    <div>
        {data?(
        <div className="flex flex-col items-center gap-8 xl:w-11/12 xl:mx-auto xl:flex-row xl:items-start">
            <Image className="w-full flex justify-center xl:w-[65%]" src={urlImg} width={500} height={500} alt={""} priority={true}/>
            <section className=" w-11/12 flex flex-col gap-4 xl:w-[35%] xl:gap-8">
                <div className="text-3xl">{data.title}</div>
                <div className="font-normal text-xl">${data.price}</div>
                <div className="text-sm font-bold flex flex-col gap-2">
                    <h1 className="font-normal">Size</h1>
                    <div className="flex gap-5">
                        {sizesTotal.map((size)=>(<button key={size} value={size} onClick={handleClickSize} disabled={!data.sizes.includes(size)} className={`${data.sizes.includes(size)?'':'text-gray-300'} ${selectedSize===size?'border-b-2 border-black':''}`}>{size}</button>))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 font-bold">
                    <h1 className=" font-normal">Quantity</h1>
                    <div className="flex gap-5 items-center">
                        <button onClick={handleClickMinus} className="active:scale-125 w-6 h-6 flex justify-center items-center">-</button>
                        <button className="bg-gray-200 w-20 h-10 rounded-sm font-normal">{quantity}</button>
                        <button onClick={handleClickPlus} className="active:scale-125 w-6 h-6 flex justify-center items-center">+</button>
                    </div>
                </div>
                {alertSize?(<div className="text-red-400 font-light text-sm xl:text-lg">Please, select a size</div>):null}
                <button onClick={handleClickAddProductCart} className="bg-indigo-400 text-white p-2 rounded-md active:scale-105 xl:w-7/12 ">Add to Cart</button>
                <div className="flex flex-col gap-4">
                    <h1>Description</h1>
                    <h2 className="text-gray-700 font-light text-md">{data.description}</h2>
                </div>
            </section>
        </div>
        ):null}
    </div>
  )
}

export default pageId