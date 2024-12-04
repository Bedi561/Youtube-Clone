/* eslint-disable no-unused-vars */
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsBell, BsYoutube } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMicrophone } from 'react-icons/fa';
import { RiVideoAddLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { useLocation, useNavigate} from 'react-router-dom'

export const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const searchTerm = useAppSelector((state) => state.YoutubeApp.searchTerm);

    const handleSearch = () =>{
        if(location.pathname !== '/search') navigate ("/search");
        else{
            dispatch
        }
    }

    return (
        <nav className="flex justify-between items-center px-4 md:px-6 h-14 bg-[#212121] sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-zinc-700 rounded-full">
                    <GiHamburgerMenu className="text-xl" />
                </button>
                <a href="/" className="flex items-center gap-2">
                    <BsYoutube className="text-3xl text-red-600" />
                    <span className="text-2xl font-pathway hidden sm:inline">YouTube</span>
                </a>
            </div>
            
            <div className="flex-1 max-w-2xl mx-4">
                <form className="flex items-center">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full bg-zinc-900 text-white h-10 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button className="absolute right-0 top-0 h-10 w-16 bg-zinc-800 flex items-center justify-center rounded-full hover:bg-zinc-700">
                            <AiOutlineSearch className="text-xl" />
                        </button>
                    </div>
                    <button type="button" className="ml-4 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
                        <FaMicrophone className="text-xl" />
                    </button>
                </form>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-zinc-700 rounded-full">
                    <RiVideoAddLine className="text-xl" />
                </button>
                <button className="p-2 hover:bg-zinc-700 rounded-full relative">
                    <BsBell className="text-xl" />
                    <span className="absolute top-0 right-0 bg-red-600 text-xs rounded-full px-1 transform translate-x-1/2 -translate-y-1/2">
                        9+
                    </span>
                </button>
                <button className="overflow-hidden rounded-full">
                    <img 
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" 
                        alt="profile" 
                        className="w-8 h-8 object-cover"
                    />
                </button>
            </div>
        </nav>
    );
}
