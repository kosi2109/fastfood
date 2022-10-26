import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = process.env.BACKEND_URL;

export const menuApi = createApi({
  reducerPath: "menus",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}/api/menus`,
    prepareHeaders : (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    }
  }),
  tagTypes: ["Menus"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => "",
      providesTags: [{ type: "Menus", id: "LIST" }],
    }),
    addMenu: builder.mutation({
      query(body) {
        return {
          url: "",
          method: "POST",
          body
        };
      },
      invalidatesTags: [{ type: "Menus", id: "LIST" }],
    }),
    editMenu: builder.mutation({
      query(data) {
        const {slug, ...body} = data;
        return {
          url: `/${slug}/update`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags : (result, error, { id })=> [{type : "Menus", id}]
    }),
    deleteMenu: builder.mutation({
      query(id) {
        return {
          url: `/${id}/delete`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Menus', id }],
    }),
  }),
});
