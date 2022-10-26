import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = process.env.BACKEND_URL;

export const sizeApi = createApi({
  reducerPath: "sizes",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}/api/size`,
  }),
  tagTypes: ["Sizes"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => "",
      providesTags: [{ type: "Sizes", id: "LIST" }],
    }),
    addSize: builder.mutation({
      query(body) {
        return {
          url: "",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Sizes", id: "LIST" }],
    }),
    editSize: builder.mutation({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `/${id}/update`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags : (result, error, { id })=> [{type : "Sizes", id}]
    }),
    deleteSize: builder.mutation({
      query(id) {
        return {
          url: `/${id}/delete`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Sizes', id }],
    }),
  }),
});
