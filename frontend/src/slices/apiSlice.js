import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

export const apiSlice = createApi({
    baseQuery, 
    //used to define types of data we are fetching from API
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({})
})
