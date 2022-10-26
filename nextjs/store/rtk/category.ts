import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = process.env.BACKEND_URL;


export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}/api/categories`,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => "/",
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
    addCategory : builder.mutation({
        query(text) {
            return {
                url : '/',
                method : "POST",
                body : {
                    text
                }
            }
        },
        invalidatesTags : [{type : "Category", id : "LIST"}]
    })
  })
});
