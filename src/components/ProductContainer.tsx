"use client"

import { useAppSelector } from "@/redux/hooks"
import Product from "./Product";
import { SeedProductDataBase, ValidFilters } from "@/types/product";

interface ProductContainerProps{
    productsData : SeedProductDataBase[]
}

const ProductContainer = ({productsData}:ProductContainerProps) => {

    const genderFilter = useAppSelector(state=>state.stateReducer.filter.type);


    const filterProducts  = (products:SeedProductDataBase[],genderInput:ValidFilters = genderFilter) : SeedProductDataBase[] => {
        const filteredProducts = products.filter((product)=>(genderFilter ==='all' || (product.gender === genderInput)))
        return filteredProducts;
    }
    const title = () => {
        if(genderFilter==='all') return 'All';
        if(genderFilter==='kid') return 'Kids';
        if(genderFilter==='men') return 'Men';
        if(genderFilter==='women') return 'Women'
    }


  return (
    <div className="w-full flex flex-col justify-center items-center">
        <div className="flex justify-center text-md font-bold" >{title()}</div>
        <div className="pt-10 grid grid-cols-2 justify-center gap-6 w-[86%] xl:grid-cols-3 xl:w-[95%] xl:gap-20">
            {productsData?filterProducts(productsData).map((product)=>(<Product key={product._id} product={product} disable={product.inStock<=0?true:false}/>)):null}
        </div>
    </div>
  )
}

export default ProductContainer
