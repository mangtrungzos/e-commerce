import { Link } from 'react-router-dom';
import config from '../../config/config';
import images from '../../assets/images/images';
import { ContactIcon, MenuToggle, SearchIcon, ShoppingCartIcon, UserIcon } from '../../assets/images/icons/icons';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../../hooks/useSidebar';

export const Header: React.FC = () => {
    const { isOpen, handleOpen } = useSidebar();

    return (
        <header className=''>
            <div className='fixed top-0 right-0 left-0 height-72 z-1 bg-white flex items-center flex-1 justify-around mt-20 pt-20 pb-20 px-7'>
                <div className='flex items-center justify-between'>
                    <button className='flex items-center'>
                        <ContactIcon />
                        <span className='font-montserrat font-semibold'>Contact Us</span>
                    </button>
                </div>
                <Link to={config.routes.home} className='mr-10'>
                    <img src={images.logo} alt='COZASTORE'/>
                </Link>
                <ul className='flex '>
                    <li><ShoppingCartIcon /></li>
                    <li className='pl-15'><UserIcon /></li>
                    <li className='pl-15'><SearchIcon /></li>
                    <li>
                        <nav 
                            className='flex items-center pl-15 gap-2 hover:cursor-pointer relative'
                            onClick={handleOpen}
                        >
                            <MenuToggle />
                            <span className='font-montserrat font-bold uppercase text-xs'>menu</span>
                        </nav>
                    </li>
                </ul>

                {isOpen && <Sidebar />}
                
            </div>
        </header>
    )
}

