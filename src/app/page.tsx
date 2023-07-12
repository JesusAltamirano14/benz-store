import ProductContainer from '@/components/ProductContainer';
import { SeedProductDataBase } from '@/types/product';

const HOST = process.env.NEXT_PUBLIC_HOST;

const getAllProducts = async() => {
  const responseData = await fetch(`${HOST}/api/products`,{cache:'no-store'});
  const response = await responseData.json();
  return response;
}

export default async function Home() {

  const productsData:SeedProductDataBase[] = await getAllProducts();
  return (
    <main className=''>
      <ProductContainer productsData={productsData}/>
    </main>
  )
}


