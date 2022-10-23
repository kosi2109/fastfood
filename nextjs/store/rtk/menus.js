// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "crud",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Crud"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => "/todos",
      providesTags: [{ type: "Crud", id: "LIST" }],
    }),
    addTodo : builder.mutation({
        query(text) {
            return {
                url : '/todos',
                method : "POST",
                body : {
                    text
                }
            }
        },
        invalidatesTags : [{type : "Crud", id : "LIST"}]
    })
  })
});
