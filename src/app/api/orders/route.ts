import { dbConnect } from "@/database/mongodb";
import { orderData } from "@/models/orderSchema";
import { productData } from "@/models/productSchema";
import { userData } from "@/models/userSchema";
import { OrderClient, OrderData } from "@/types/order";
import { SeedProductDataBase } from "@/types/product";
import { User } from "@/types/user";
import { getProductsReadyToPost } from "@/utils/functions";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";


export async function POST(request:Request) {


    try {
        const body : OrderClient = await request.json();
        const {userId, itemsOrder} = body;

        console.log('userID:',userId,'items llegados: ',itemsOrder)
        
        dbConnect();
        const session = await getServerSession();
        if(!session) return NextResponse.json({message:'must be authenticated'});
        
        const userFounded : User | null  = await userData.findById(userId);

        if(!userFounded) return NextResponse.json({message:`user doesn't exist`});

        if(!userFounded.address?.address) return NextResponse.json({message:'Debe agregar una direccion de entrega a su perfil'});

        if(!userFounded.phone) return NextResponse.json({message:'Debe agregar un numero de referencia'});

        const productsId = itemsOrder.map(p => p._id);

        const productsFounded : Array<SeedProductDataBase> = await productData.find({_id:{$in: productsId}});

        const productsReadyToPost = getProductsReadyToPost(productsFounded,itemsOrder);

        const numberProducts = productsReadyToPost.reduce((accumulator,product)=>(accumulator+ product.quantity),0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE);
        const subTotal = productsReadyToPost.reduce((accumulator,product) => (accumulator + product.price*product.quantity),0);
        const taxes = (taxRate*subTotal)/100;
        const total = subTotal + taxes;

        const orderCreated = new orderData({
            userId,
            userEmail:userFounded.email,
            itemsOrder:productsReadyToPost,
            address:userFounded.address,
            phone:userFounded.phone,
            numberProducts,
            subTotal,
            taxes,
            total,
            isPaid:false,
        })

        const orderSaved = await orderCreated.save();
        return NextResponse.json(orderSaved);
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({message:error.message});
    }

}
