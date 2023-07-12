import ProductContainer from '@/components/ProductContainer';
import React from 'react'

const getProductsSearched = async (keyword:string) => {
    const HOST = process.env.NEXT_PUBLIC_HOST
    const responseData = await fetch(`${HOST}/api/search/${keyword}`);
    const response = await responseData.json();
    return response
}

const PageSearch = async ({params}:{params:{keyword:string}}) => {

    const {keyword} = params;
    const productsSearched = await getProductsSearched(keyword);

  return (
    <div>
        <h1 className='w-[86%] mx-auto mt-4 font-bold text-xl'>Search Product</h1>
        <ProductContainer productsData={productsSearched} disableTitle={true}/>
    </div>
  )
}

export default PageSearch