import '@/styles/components/hero.css';

function Hero(){
    return(
        <>
        <div className='hero bg-[url(/images/hero.png)] bg-center bg-no-repeat bg-cover flex items-center justify-center h-150'>
            <div className='flex flex-col items-center justify-center'>
                <p className='hero-p text-white'>Inspired by the streets. Built for your story.</p>
                <p className='hero-title bg-gradient-to-t from-black via-[#e1ae78] to-white bg-clip-text text-transparent'>YVR-District</p>
            </div>
        </div>
        </>
    );
}

export default Hero