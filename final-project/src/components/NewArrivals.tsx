'use client'

import { useState } from 'react';
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
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setEmail('');

        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    return(
        <section>

        {submitted && (
            <div
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
            className='fixed bottom-5 right-5 max-w-sm w-full bg-gradient-to-r from-[#a2a8d3] from-33.3% via-[#e7eaf6] via-33.3% to-[#a2a8d3] to-33.3% border border-[#e7eaf6] text-[#113f67] px-4 py-3 rounded shadow-lg z-50'>
                <strong className='font-bold'>Congrats!!</strong>
                <span className='block sm:inline ml-2'>Thanks for subscribing!</span>
            </div>
        )}

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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {images.map((img, index) => (
                        <div
                        key={index}
                        className={`relative overflow-hidden rounded-xl shadow-lg group ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : '' }`}
                        >
                            <img 
                            src={img.src}
                            alt={`New arrival ${index + 1}`}
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' 
                            />
                        </div>
                    ))}
                </div>

                <div className='flex justify-center items-center'>
                    <button className="border border-x-4 border-black text-black rounded-full hover:bg-[#e1ae78] hover:text-black font-semibold py-2 px-4 text-[18px] m-4">
                        <a href="/products">See All</a>
                    </button>
                </div>
            </div>

            {/*Subscribe for new arrivals */}
            <div className='subscribe bg-[#4f4f4f] flex flex-col items-center justify-center h-96'>
                    <div className='subscribe-title flex flex-col items-center justify-center'>
                        <p className='text-[40px] text-white'>Subscribe To Our Newsletter</p>
                        <p className='text-[24px] text-white'>Sign up for our weekly update and be the first to know about our specials and promotions.</p>
                    </div>
                    <form onSubmit={handleSubmit} action="#" method='POST' className='space-y-6'>
                        <label htmlFor="email" className='sr-only'>
                            Email Address
                        </label>
                        <div className='mt-2'>
                            <input
                            id='email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email Address'
                            className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1' 
                            />

                        <div className='flex justify-center items-center'>
                            <button className="border border-x-4 border-black text-white rounded-full hover:bg-[#e1ae78] hover:text-black font-semibold py-2 px-4 text-[18px] m-4">
                                Subscribe
                            </button>
                        </div>
                        </div>
                    </form>
            </div>
        </section>
    );
}

export default NewArrivals