import { useState } from 'react';
import images from "../../assets/images/images";

const Container:React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');  

    const tabItems = [
        { id: 'all', label: 'All Products' },
        { id: 'women', label: 'women' },
        { id: 'men', label: 'men' },
        { id: 'bag', label: 'bag' },
        { id: 'shoes', label: 'shoes' },
        { id: 'watches', label: 'watches' },
    ]

    return (
        <main className="w-full">
            <div className="flex flex-col">
                <div className="pb-10">
                    <h3 className="uppercase text-4xl font-bold">product overview</h3>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center ">
                    <div className="flex flex-wrap mb-6 md:mb-0">
                        {tabItems.map((item, index) => (
                            <div key={item.id} className="relative">
                                <button
                                    className={`pb-5 ${index === 0 ? 'mr-[17px]' : 'mx-[17px]' } text-base leading-[1.2] cursor-pointer font-sans font[Poppins-regular] capitalize
                                        ${activeTab === item.id ? 'text-[#333]' : 'text-[#888]'}
                                    `}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    
                                    <span className="relative inline-block pb-3">
                                        {item.label}
                                        <span 
                                            className={`absolute -bottom-1 left-0 h-0.5 bg-[#797979] transition-all duration-300 ease-in-out
                                            ${activeTab === item.id ? 'w-full' : 'w-0'}`}
                                        ></span>
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="flex gap-8">
                            <div className="group flex items-center hover:bg-[#717fe0] hover:border-[#717fe0] transition-colors duration-300 cursor-pointer rounded-sm py-7 px-[15px] border border-[#e6e6e6]">
                                <img className="w-12 h-15 transition-colors filter group-hover:brightness-0 group-hover:invert" src={images.filterIcon} />
                                <p className="capitalize pl-6 text-[#888] group-hover:text-white font-[var(--font-pops)]">filter</p>
                            </div>
                            <div className="group flex items-center hover:bg-[#717fe0] hover:border-[#717fe0] cursor-pointer rounded-sm py-7 px-[15px] border border-[#e6e6e6]">
                                <img  className="w-17 h-20 transition-colors filter group-hover:brightness-0 group-hover:invert" src={images.searchIcon} />
                                <p className="capitalize pl-6 text-[#888] group-hover:text-white font-[var(--font-pops)]">search</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Container;