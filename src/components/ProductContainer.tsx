"use client"

import { useAppSelector } from "@/redux/hooks"
import Product from "./Product";
import { SeedProductDataBase, ValidFilters } from "@/types/product";
import {Variants, motion} from 'framer-motion'

interface ProductContainerProps{
    productsData : SeedProductDataBase[],
    disableTitle:boolean
}

const ProductContainer = ({productsData,disableTitle}:ProductContainerProps) => {

    const genderFilter = useAppSelector(state=>state.stateReducer.filter.type);


    const filterProducts  = (products:SeedProductDataBase[],genderInput:ValidFilters = genderFilter) : SeedProductDataBase[] => {
        const sortedProducts = products.sort((a,b)=>(b.price-a.price));
        const filteredProducts = sortedProducts.filter((product)=>(genderFilter ==='all' || (product.gender === genderInput)))
        return filteredProducts;
    }

    const variantsProductContainer : Variants= {
        visible:{
            transition:{
                staggerChildren:0.17,
                delayChildren:0,
                delay:0
            }
        }
    }

    const variantsChildrenProduct : Variants = {
        hidden:{
            x:-100,
            opacity:0,
        },
        visible:{
            x:0,
            opacity:1,
            transition:{
                type:"spring",
                stiffness:200,
                damping: 20,
            }
        }
    }

  return (
    <div className="w-full">
        <motion.div variants={variantsProductContainer} initial="hidden" animate="visible"
        className="pt-10 grid grid-cols-2 justify-center gap-6 w-[86%] mx-auto xl:grid-cols-3 xl:w-[95%] xl:gap-20"
        >
            {productsData?filterProducts(productsData).map((product,index)=>(<motion.div key={index} variants={variantsChildrenProduct}><Product key={product._id} product={product} disable={product.inStock<=0?true:false}/></motion.div>)):null}
        </motion.div>
    </div>
  )
}

export default ProductContainer
