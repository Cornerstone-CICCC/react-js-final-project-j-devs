import Header from "@/components/Header";

function Contact(){
    return(
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#978d58] via-[#eae1e1] to-[#0b5269]">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 border-8 border-black rounded-2xl">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">Contact Us</h1>
                    <p></p>
                </div>
            </div>
        </>
    );
}

export default Contact