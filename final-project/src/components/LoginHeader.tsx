"use client"
import { logoutCustomer } from '@/app/actions/customer.actions';
import '@/styles/components/header.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import LogoutBtn from './LogoutBtn';

function LoginHeader(){

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await logoutCustomer(formData)
        router.push("/")
    }
    return(
        <>
        {/*Banner */}
        <div className='font-averia banner bg-white text-black flex justify-center text-[24px] sm:text-[22px]'>
            <p>Summer Season Coming Soon!!! Pre-order NOW!! </p>
        </div>
        {/*Navbar */}
        <nav className='bg-gray-500' aria-label='Main navigation menu'>
            <div className='navbar-container bg-gray-500 flex flex-col sm:flex-col md:flex-row sm:justify-between md:justify-between px-4 sm:px-6 md:px-6 py-2 w-full'>
                {/*menu */}
                <ul className='menu flex flex-col space-y-2 items-start sm:items-center sm:text-[22px] md:flex-row md:space-y-0 md:space-x-6 md:items-center md:text-[24px]'>
                    <li className='logo-name'>
                        <Link href="/">YVR District</Link>
                    </li>
                    <li className='font-semibold'>
                        <Link href="/products">Products</Link>
                    </li>
                    <li>
                        <Link href="#aboutPage">AboutUs</Link>
                    </li>
                    <li>
                        <Link href="/contact">ContactUs</Link>
                    </li>
                    <li>
                        <Link href="https://maps.app.goo.gl/Pfi1vjkxSTW19JQY8" target='_blank'>Location</Link>
                    </li>
                </ul>

                {/*menu2 */}
                <ul className='menu2 flex flex-col space-y-2 items-start sm:items-center mt-4 sm:mt-0 md:flex-row md:space-y-0 md:space-x-6 md:items-center md:mt-0'>
                    <li>
                    <form className='flex items-center w-full relative sm:max-w-sm md:max-w-md lg:max-w-lg px-2'>
                        <label htmlFor="default-search" className='sr-only'>Search</label>
                        <div className='relative w-full'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>   
                                <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                </svg>
                            </div>
                            <input 
                            type="search"
                            id="default-search"
                            className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                             placeholder="Search..."
                             required
                            />
                            <button
                            type='submit'
                            className='text-gray-900 absolute right-2.5 bottom-2.5 bg-gray-50 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5'>
                                Search
                            </button>
                        </div>
                    </form>
                    </li>
                    <li>
                        <LogoutBtn />
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default LoginHeader