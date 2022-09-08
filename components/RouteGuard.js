import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getUser, setAccessToken, setUser } from '../store/slices/authSlice';
import persist from '../store/persist';
import { useFetchUserQuery } from '../store/reducers/authApi';

export default function RouteGuard({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const accessToken = useSelector(getAccessToken)
    
    const {data:user, isLoading: isLoadingUser} = useFetchUserQuery(null, {skip: !accessToken})

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        dispatch(setUser(user ?? null))
    },[user]);

    useEffect(() => {
        if(!accessToken){
            dispatch(setAccessToken(persist.get('accessToken') ?? '')); 
        }

        if(accessToken != null) authCheck(router.asPath);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [accessToken]);

    function authCheck(url) {
        let loginUrl = '/auth/login';

        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = [loginUrl, '/auth/register'];
        const path = url.split('?')[0];
        
        if (!accessToken && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: loginUrl,
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}