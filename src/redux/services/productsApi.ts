import { SeedProductDataBase } from "@/types/product";
import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";

const HOST = process.env.NEXT_PUBLIC_HOST;

export const productsApi = createApi({
    reducerPath:'productsApi',
    baseQuery: fetchBaseQuery({baseUrl:`${HOST}/api/`}),
    endpoints: builder => ({
        getAllProducts: builder.query<Array<SeedProductDataBase>,null>({
            query: () => `products`
        }),
        getProductsById: builder.query<SeedProductDataBase,string>({
            query: (id) => `products/${id}`
        })
    })
})

export const {useGetAllProductsQuery,useGetProductsByIdQuery} = productsApi;
