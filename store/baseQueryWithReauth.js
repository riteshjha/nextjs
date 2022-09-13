import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { loggedOut } from '../store/slices/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://storytime.test/api',

    prepareHeaders: (headers, { getState }) => {
        headers.set('accept', 'application/json')

        const accessToken = getState().auth?.accessToken

        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }

        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        // try to get a new token
        //const refreshResult = await baseQuery('/refreshToken', api, extraOptions)

        // if (refreshResult.data) {
        //     // store the new token
        //     api.dispatch(tokenReceived(refreshResult.data))
        //     // retry the initial query
        //     result = await baseQuery(args, api, extraOptions)
        // } else {
            api.dispatch(loggedOut())
       //}
    }

    return result
}

export const createRequest = (url, method = 'GET', body) => ({ 
    url, 
    method,
    body
});

export default baseQueryWithReauth;
