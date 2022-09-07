import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import PublicLayout from "../../components/layouts/PublicLayout";
import { useProcessLoginMutation } from "../../store/reducers/authApi";
import { setAccessToken, setUser } from "../../store/slices/authSlice";
import { useForm } from 'react-hook-form';

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [processLogin, {data:loginResponse, isLoading, isSuccess, error}] = useProcessLoginMutation()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        if(isSuccess){
            dispatch(setAccessToken(loginResponse.accessToken))
            dispatch(setUser(loginResponse.user))

            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl);
        }else if(error){
            console.log(error);
        }
    }, [isSuccess, error])

    return (
        <PublicLayout>
            <form onSubmit={handleSubmit(processLogin)}>
                <p className="mb-4">Please login to your account</p>
                <div className="mb-4">
                    <input type="text" {...register("email", { required: true })}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email"
                    />
                    {errors.email && <div className="text-red-400 text-sx">Email required</div>}
                </div>
                <div className="mb-4">
                    <input type="password" {...register("password", { required: true })}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    />
                    {errors.password && <div className="text-red-400 text-sx">Password required</div>}
                </div>
                <div className="text-center pt-1 mb-12 pb-1">
                    <button className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        data-mdb-ripple="true" data-mdb-ripple-color="light" style={{background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }} disabled={isLoading}>
                        {isLoading ? 'Processing' : 'Log In'}
                    </button>
                    <a className="text-gray-500" href="#!">Forgot password?</a>
                </div>
                <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2">Don't have an account?</p>
                    <button
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    >
                    Signup
                    </button>
                </div>
            </form>
        </PublicLayout>
    );

}