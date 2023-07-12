import PageId from '@/components/products/ProductId';

const HOST = process.env.NEXT_PUBLIC_HOST;

const getProductData = async(id:string) => {
    const responseData = await fetch(`${HOST}/api/products/${id}`);
    const response = await responseData.json();
    console.log('producto individual:',response);
    return response;
}


const ProductIdPage = async ({params}:{params:{id:string}}) => {

    const {id:_id} = params;
    const productData = await getProductData(_id);


  return (
    <div>
        <PageId data={productData}/>
    </div>
  )
}

export default ProductIdPage