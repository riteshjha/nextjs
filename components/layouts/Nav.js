import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from '.';
import { getAccessToken } from '../../store/slices/authSlice';

export default function Nav() {
    const [user, setUser] = useState(null);

    const accessToken = useSelector(getAccessToken)


    // useEffect(() => {
    //     const subscription = userService.user.subscribe(x => setUser(x));
    //     return () => subscription.unsubscribe();
    // }, []);

    function logout() {
        // userService.logout();
    }

    // only show nav when logged in
    if (!accessToken) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}