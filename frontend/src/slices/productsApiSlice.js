import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
  //no fetch or axios, this is what performs the query to api
  endpoints: (builder) => ({
    //getProducts is name of our query
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    })
  }),
});

//this is what we use in our component whenever we want to fetch data
export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
