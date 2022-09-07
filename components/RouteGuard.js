import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../store/slices/authSlice';

export default function RouteGuard({ children }) {
    const router = useRouter();

    const accessToken = useSelector(getAccessToken)

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [accessToken]);

    function authCheck(url) {
        console.log("Auth check url => ", url);

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