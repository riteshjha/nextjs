import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth, { createRequest } from '../baseQueryWithReauth'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    tagTypes:['User', 'Profile'],
    endpoints: builder => ({
       
        'processSignup': builder.mutation({
            query: (data) => createRequest('/signup', 'POST', data),
            transformResponse: (response) => response.body
        }),

        'processLogin': builder.mutation({
            query: (data) => createRequest('/login', 'POST', data),
            transformResponse: (response) => response.body
        }),

        'fetchUser': builder.query({
            query: () => createRequest('/user'),
            transformResponse: (response) => response.body,
            providesTags: ['Profile']
        }),

        'fetchUserById': builder.query({
            query: (id) => createRequest(`/user/${id}/info`),
            transformResponse: (response) => response.body,
            providesTags: ['User']
        }),

        'fetchNotifications': builder.query({
            query: () => createRequest(`/notifications`),
            transformResponse: (response) => response.body.items
        }),

    })
})

export const { 
    useFetchUserQuery,
    useFetchUserByIdQuery,
    useFetchNotificationsQuery,
    useProcessSignupMutation,
    useProcessLoginMutation
} = authApi;