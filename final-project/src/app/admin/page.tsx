import Link from "next/link";

function Admin(){
    return(
        <>
        <section>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#e0e0e0]">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="#" className="flex items-center p-2 text-[#283739] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            
                            </Link>
                        </li>
                    </ul>
                </div>
                <span className="ms-3 text-[#283739]">Dashboard</span>
            </aside>
        </section>
        </>
    );
}

export default Admin