import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

//deals with api calls

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //post request, so mutation. sends request to backend and gets cookie. then when we get data back, we call "set credentials" in authslice
    login: builder.mutation({
      //name and password send in data
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = usersApiSlice;
