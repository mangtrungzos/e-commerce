import { useEffect, useRef, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config/config';
import { MENU_PROFILE, MENU_HEADER } from '../../config/menu';
import { MenuProfile } from '../common/MenuProfile';
import { logout } from '../../redux/auth/authSlice';
import images from '../../assets/images/images';
import { MenuToggle, SearchIcon, ShoppingCartIcon, UserIcon } from '../../assets/images/icons/icons';
import { Sidebar } from './Sidebar';
import { Search } from '../../features/search/components/Search';
import { AppDispatch, RootStore } from '../../redux/store';
import { sideBarShow } from '../../redux/sideBar/sideBarSlice';
import { ShoppingBag } from '../../features/cart/components/ShoppingBag';

export const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowBag, setIsShowBag] = useState(false);

    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    // Authentication when login
    const isAuthenticated = useSelector((state: RootStore) => state.auth.isAuthenticated);

    // Handle show sidebar
    const handleShow = () => {
        dispatch(sideBarShow());
    }

    // Handle show search bar
    const handleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    }

    // Handle show menu profile
    const handleShowMenuProfile = () => {
        setIsShowMenu(!isShowMenu);
    }

    // Handle show shopping bag
    const handleShowShoppingBag = () => {
        setIsShowBag(!isShowBag);
    }

    // Handle logout
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    // Handle hide menu profile when transition page
    useEffect(() => {
        setIsShowMenu(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <>
            <header className='relative'>
                <div className='fixed gap-[100px] mt-0 top-0 right-0 left-0 height-72 z-1 shadow-xs bg-white flex items-center flex-1 justify-around pt-20 pb-20 px-7'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center mr-40'>
                            <Link to={config.routes.home}>
                                <img src={images.logo} alt='COZASTORE'/>
                            </Link>
                        </div>
                        <ul className='flex gap-4'>
                            {MENU_HEADER.map((item) => (
                                <li 
                                    className={`px-10 mx-10 cursor-pointer font-[GucciSansPro-medium] hover:text-[#6774d5]
                                        ${location.pathname === item.path ? 'text-[#6774d5]' : 'text-[#333]'}`
                                    } key={item.id}
                                >
                                    <Link to={item.path || '#'}>
                                        {item.title}
                                    </Link>
                                </li>

                            ))}
                        </ul>
                    </div>
                    <ul className='flex'>
                        <li>
                            <button 
                                className='hover:opacity-80 hover:cursor-pointer transition-opacity'
                                onClick={handleShowShoppingBag}
                            >
                                <ShoppingCartIcon />    
                            </button>
                            {isShowBag && (
                                <div className='absolute'>
                                    <ShoppingBag />
                                </div>
                            )}
                        </li>
                        <li className='pl-15'>
                            <button 
                                className='hover:opacity-80 hover:cursor-pointer transition-opacity'
                                onClick={handleShowMenuProfile}
                            >
                                <UserIcon />
                            </button>
                            {isShowMenu && (
                                <div 
                                    className='absolute right-1/9 h-auto rounded-sm bg-white shadow-xl'
                                    ref={menuRef}
                                >
                                    <ul className='px-16 pt-32'>
                                        {MENU_PROFILE.map((item, index) => {
                                            if(isAuthenticated && item.id === 'sign in') return null;
                                            if(!isAuthenticated && (item.id === 'my account' || item.id === 'sign out')) return null;
                                            return (
                                                <MenuProfile 
                                                    item={item} 
                                                    key={index} 
                                                    index={index}
                                                    onLogout={item.id === 'sign out' ? handleLogout : undefined}
                                                />
                                            )
                                        })}
                                    </ul>
                                    {/* <div className='border-t mb-2'></div> */}
                                </div>
                            )}
                        </li>
                        <li className='pl-15'>
                            <button className='hover:opacity-80 hover:cursor-pointer transition-opacity'
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </button>
                        </li>
                        {isSearchVisible && <Search isSearchVisible={isSearchVisible} setIsSearchVisible={setIsSearchVisible}/>}
                        <li>
                            <nav 
                                className='flex items-center pl-15 gap-2 hover:cursor-pointer relative'
                                onClick={handleShow}
                            >
                                <MenuToggle />
                                <span className='font-montserrat font-bold uppercase text-xs'>menu</span>
                            </nav>
                        </li>
                    </ul>
                </div>
            </header>
            <Sidebar />
        </>
    )
}

