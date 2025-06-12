import Header from "@/components/Header";

function Contact(){
    return(
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#978d58] via-[#eae1e1] to-[#0b5269]">
                <section className="flex items-center w-full max-w-3xl bg-transparent border-black border-8 rounded-2xl shadow-sm md:flex-row">
                <div className=" mx-auto max-w-screen-xl text-center py-24">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">Contact Us</h1>
                    <p className="mb-8 text-lg font-normal ">We are here for you. Let's talk!!</p>

                    {/*First Name */}
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#204969] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your first name" required />
                    </div>

                    {/*Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dadada] dark:border-gray-500 dark:placeholder-gray-400 dark:text-[#204969]" placeholder="email@example.com" required />
                    </div>

                    {/*Message */}
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">
                            Your message
                        </label>
                        <textarea name="message" id="message" rows={4} className="block p-2.5 w-full text-sm text-[#204969] bg-[#dadada] rounded-lg border border-gray focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>

                    {/*Button */}
                    <button type="submit" className="flex justify-center mt-5 w-full text-[#03051e] bg-[#978d58] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-[#0b5269] dark:hover:text-[#eae1e1]">
                        Sign up to your account
                    </button>
                </div>
                </section>
            </div>
        </>
    );
}

export default Contact