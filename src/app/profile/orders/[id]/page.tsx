import OrdersContainer from '@/components/profile/orders/OrdersContainer';

const getOrdersData = async(id:string) => {
  const HOST = process.env.NEXT_PUBLIC_HOST;
  const responseData = await fetch(`${HOST}/api/orders/total/${id}`);
  const response = await responseData.json();
  return response
}

const OrdersId = async ({params}:{params:{id:string}}) => {

    const {id} = params;
    const ordersData = await getOrdersData(id);

  return (
    <div>
      <OrdersContainer ordersData={ordersData}/>
    </div>
  )
}

export default OrdersId