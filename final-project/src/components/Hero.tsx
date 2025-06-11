import '@/styles/components/hero.css';

function Hero(){
    return(
        <>
        <div className='hero bg-[url(/images/hero.png)] bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center h-170'>
            <div className='flex flex-col items-center justify-center'>
                <p className='hero-p text-white'>Inspired by the streets. Built for your story.</p>
                <p className='hero-title bg-gradient-to-t from-black via-[#e1ae78] to-white bg-clip-text text-transparent'>YVR-District</p>
            </div>
            <div className='hero-btn absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center'>
                <button className="border border-x-4 border-black text-white rounded-full hover:bg-[#e1ae78] hover: hover:text-black font-semibold py-5 px-12 text-[24px] ">
                Shop Now
                </button>
            </div>
        </div>
        </>
    );
}

export default Hero