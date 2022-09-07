import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { getAccessToken } from '../../store/slices/authSlice';

export default function PublicLayout({ children }) {
    const router = useRouter();

    const accessToken = useSelector(getAccessToken)


    useEffect(() => {
        // redirect to home if already logged in
        console.log("accessToken layout => ", accessToken);
        if (accessToken) {
            router.push('/');
        }

    }, []);

    return (
        <section className="h-full gradient-form bg-gray-200 md:h-screen">
            <div className="flex justify-center items-center py-12 px-6 h-full">
                <div className="flex justify-center items-center h-full g-6 text-gray-800">
                    <div className="xl:w-10/12">
                        <div className="block bg-white shadow-lg rounded-lg">
                            <div className="lg:flex lg:flex-wrap g-0">
                                <div className="lg:w-6/12 px-4 md:px-0">
                                    <div className="md:p-12 md:mx-6">
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                alt="logo"
                                            />
                                            <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">We are The Lotus Team</h4>
                                        </div>
                                        { children }
                                    </div>
                                </div>
                                <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none" style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                                        <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}