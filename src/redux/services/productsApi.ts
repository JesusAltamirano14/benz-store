import { SeedProductDataBase } from "@/types/product";
import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";


export const productsApi = createApi({
    reducerPath:'productsApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3000/api/'}),
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