import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import Nav from './Nav'

export default function AppLayout({ children }) {
    const router = useRouter();

    return (
        <div className="min-h-full">
            <Nav />
            <main>
                <div className="max-w-7xl mx-auto py-3 sm:py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}