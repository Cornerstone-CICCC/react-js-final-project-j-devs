import '@/styles/components/header.css';

function Header(){
    return(
        <>
        {/*Banner */}
        <div className='font-averia banner bg-white text-black flex justify-center text-[24px]'>
            <p>Summer Season Coming Soon!!! Pre-order NOW!! </p>
        </div>
        {/*Navbar */}
        <nav className='bg-gray-500' aria-label='Main navigation menu'>
            <div className='navbar-container bg-gray-500 flex justify-between px-6 py-2'>
                {/*menu */}
                <ul className='menu flex space-x-6 items-center'>
                    <li className='logo-name'>
                        <a href="/">YVR District</a>
                    </li>
                    <li className='font-semibold'>
                        <a href="/products">Products</a>
                    </li>
                    <li>
                        <a href="/about">AboutUs</a>
                    </li>
                    <li>
                        <a href="https://maps.app.goo.gl/Pfi1vjkxSTW19JQY8" target='_blank'>Location</a>
                    </li>
                </ul>

                {/*menu2 */}
                <ul className='menu2 flex space-x-6 items-center'>
                    <form className='flex items-center w-full max-w-xs relative'>
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
                            className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="Search..."
                             required
                            />
                            <button
                            type='submit'
                            className='text-gray-900 absolute right-2.5 bottom-2.5 bg-gray-50 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5'>
                                Search
                            </button>
                        </div>
                    </form>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">Signup</a>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default Header