"use client"
import LoginHeader from "@/components/LoginHeader";
import Link from 'next/link';
import { useState } from "react";
import { loginCustomer } from "../actions/customer.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Login(){

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData(e.currentTarget);
        const result = await loginCustomer(formData);
    
        if (result.success) {
            toast.success(result.message);
    
            const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com"; // must match .env
    
            if (result.user?.email === adminEmail) {
                router.push("/admin");
            } else {
                router.push("/products");
            }
        } else {
            toast.error(result.message);
        }
    
        setLoading(false);
    };
    

    return(
        <>
            <LoginHeader />

            <div className="flex justify-center items-center min-h-screen bg-[#204969]">
                <section className="flex flex-col items-center w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-[#dadada]">

                <div className="w-full md:w-full lg:w-full p-5">
                <img
                    className="object-cover w-full rounded-t-lg md:h-auto md:w-full md:rounded-none md:rounded-s-lg"
                    src="/images/about.png"
                    alt="About section illustration"
                />
                </div>

                <div className="w-full md:w-full p-4 bg-white border-t md:border-t-0 md:border-l border-gray-200 rounded-b-lg md:rounded-none md:rounded-e-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Welcome back!</h5>
                    {/*Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-500 dark:placeholder-gray-400 dark:text-[#204969]" placeholder="email@example.com" required />
                    </div>

                    {/*Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-500 dark:placeholder-gray-400 dark:text-[#204969]" required />
                     </div>

                     {/*Data recover */}
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="text-white font-semibold ease-in-out duration-200 flex justify-center w-1/2 text-[#204969] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#08ffc8] dark:hover:bg-[#dadada] dark:focus:ring-blue-800">
                        {loading ? "Signing up..." : "Login to your account"}
                    </button>

                     <div className="text-sm font-medium text-gray-500 dark:text-[#08ffc8]">
                            Not registered? 
                            <Link href="/signup" className="text-blue-700 hover:underline dark:text-[#fff7f7]">
                                Create your account now!
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
            </div>

        </>
    );
}

export default Login