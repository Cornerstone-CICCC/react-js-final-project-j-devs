'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginHeader from "@/components/LoginHeader"
import { addCustomer } from '../actions/customer.actions'
import toast from 'react-hot-toast'

function Signup(){

    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.")
            return
        }
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const result = await addCustomer(formData)
        if (result.success) {
            toast.success(result.message)
            router.push("../login")
        } else {
            toast.error(result.message)
        }
        setLoading(false)
    }

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
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Join our Community!</h5>

                    {/*First Name */}
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <input type="text" name="firstname" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#204969] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your first name" required />
                    </div>

                    {/*Last Name */}
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" name="lastname" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#204969] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your last name" required />
                    </div>

                    {/*Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-500 dark:placeholder-gray-400 dark:text-[#204969]" placeholder="email@example.com" required />
                    </div>

                    {/*Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-500 dark:placeholder-gray-400 dark:text-[#204969]" required />
                     </div>

                    {/*Confirm Password */}
                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#204969] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        {password && confirmPassword && password !== confirmPassword && (
                            <p className='text-red-500 font-semibold text-sm mt-1'>Passwords do not match.</p>
                        )}
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
                        {loading ? "Signing up..." : "Sign up to your account"}
                    </button>

                     <div className="text-sm font-medium text-gray-500 dark:text-[#08ffc8]">
                            Already registered? 
                            <Link href="/login" className="text-blue-700 hover:underline dark:text-[#fff7f7]">
                                Go to your account!
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
            </div>

        </>
    );
}

export default Signup