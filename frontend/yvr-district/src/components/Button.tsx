'use client'

import { useEffect, useState } from 'react';

function Toast(){

    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return(
        show &&(
        <div 
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
        className='fixed bottom-5 right-5 max-w-sm w-full bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50'
        >
            <div className='text-gray-800'>
                Thanks for subscribing!
            </div>
            <div className='mt-4 pt-2 border-t border-gray-200 flex justify-end gap-2'>
                <button
                type='button'
                onClick={() => setShow(false)}
                className='bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded hover:bg-gray-300'>
                    Close
                </button>
            </div>
        </div>
        )   
    );
}

export default Toast