import '@/styles/components/about.css';

function About(){
    return(
        <>
        <div className="bg-white">
            <div className="about-title text-[50px] bg-gradient-to-t from-[#e1ae78] to-[#412a20] py-6">
                <h2 className="text-white text-center font-bold">Our Story</h2>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e1ae78" fillOpacity="1" d="M0,192L34.3,170.7C68.6,149,137,107,206,106.7C274.3,107,343,149,411,186.7C480,224,549,256,617,250.7C685.7,245,754,203,823,197.3C891.4,192,960,224,1029,208C1097.1,192,1166,128,1234,112C1302.9,96,1371,128,1406,144L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>

            <div className="flex flex-row p-8 gap-8">
                <div className="flex flex-col max-w-xl">
                    <p className='text-[35px] font-semibold mb-2'>Who we are?</p>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores optio deleniti perspiciatis nihil. Voluptatibus ipsum quam ab cupiditate nostrum perferendis, dolorem odio, aliquid a esse numquam vero quibusdam assumenda id.
                    </p>
                </div>

                <div className="flex flex-col w-full max-w-xl">
                    <img className="w-full rounded-lg shadow-lg object-cover"  src="/images/about.png" alt="about us image" />
                </div>
            </div>
        </div>
        </>
    );
}

export default About