import '@/styles/components/arrivals.css';

const images = [
    { src: '/images/arrivals/item1.jpg'},
    { src: '/images/arrivals/item2.jpg'},
    { src: '/images/arrivals/item3.jpg'},
    { src: '/images/arrivals/item4.jpg'},
    { src: '/images/arrivals/item5.jpg'},
    { src: '/images/arrivals/item6.jpg'},
];

function NewArrivals(){
    return(
        <>
            <div className="bg-white py-24">
                <div className="arrivals-title text-[50px] bg-gradient-to-b from-[white] to-[#4f4f4f] py-6">
                    <h2 className="text-center font-bold text-white">
                        New Arrivals
                    </h2>
                    <p className='mx-auto mt-2 max-w-lg text-center text-3xl font-semibold text-[#e1ae78] tracking-tight text-balance'>
                        A new collection. A new style. For you everyday urban moment.
                    </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4f4f4f" fillOpacity="1" d="M0,192L80,181.3C160,171,320,149,480,122.7C640,96,800,64,960,90.7C1120,117,1280,203,1360,245.3L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>

                {/*Grid */}
                <div className='grid grid-cols-4 gap-4 p-4'>
                    {images.map((img, index) => (
                        <div
                        key={index}
                        className={`relative overflow-hidden rounded-xl shadow-lg group ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : '' }`}
                        >
                            <img 
                            src={img.src}
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default NewArrivals