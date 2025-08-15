import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const TodoApi = createApi({
    reducerPath: 'TodoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://37.27.29.18:8001/' }),
    tagTypes: ["Todo", "TodoById"],
    endpoints: (build) => ({
        GetData: build.query({
            query: () => `api/to-dos`,
            providesTags: ["Todo"]
        }),
        DeleteData: build.mutation({
            query: (id) => {
                return {
                    url: `api/to-dos/?id=${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["Todo"]
        }),
        DeleteImage: build.mutation({
            query: (id) => {
                return {
                    url: `api/to-dos/images/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["TodoById"]
        }),
        AddData: build.mutation({
            query: (newObj) => {
                return {
                    url: "api/to-dos",
                    method: "POST",
                    body: newObj
                }
            },
            invalidatesTags: ["Todo"]
        }),
        AddImage: build.mutation({
            query: ({ id, newImage }) => {
                return {
                    url: `api/to-dos/${id}/images`,
                    method: "POST",
                    body: newImage
                }
            },
            invalidatesTags: ["TodoById"]
        }),
        EditData: build.mutation({
            query: (patch) => {
                return {
                    url: "api/to-dos",
                    method: "PUT",
                    body: patch
                }
            },
            invalidatesTags: ["Todo"]
        }),
        EditDataStatus: build.mutation({
            query: ({ id, patch }) => {
                return {
                    url: `completed?id=${id}`,
                    method: "PUT",
                    body: patch
                }
            },
            invalidatesTags: ["Todo"]
        }),
        InfoData: build.query({
            query: (id) => `api/to-dos/${id}`,
            providesTags: ["TodoById"]
        })
    }),
})


export const { useGetDataQuery, useDeleteDataMutation, useAddDataMutation, useEditDataMutation, useEditDataStatusMutation, useDeleteImageMutation, useInfoDataQuery, useAddImageMutation } = TodoApi