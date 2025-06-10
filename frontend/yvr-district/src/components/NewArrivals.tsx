import '@/styles/components/arrivals.css';

function NewArrivals(){
    return(
        <>
            <div className="bg-white">
                <div className="arrivals-title text-[50px] bg-gradient-to-b from-[white] to-[#4f4f4f] py-6">
                    <h2 className="text-center font-bold text-white">
                        New Arrivals
                    </h2>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4f4f4f" fillOpacity="1" d="M0,192L80,181.3C160,171,320,149,480,122.7C640,96,800,64,960,90.7C1120,117,1280,203,1360,245.3L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            </div>
        </>
    );
}

export default NewArrivals