import LoginHeader from "@/components/LoginHeader";

function Login(){
    return(
        <>
            <LoginHeader />
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                src="/images/about.png" 
                alt="login image" />

                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form action=""></form>
                </div>
            </div>
        </>
    );
}

export default Login