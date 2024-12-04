import {MdHomeFilled, MdOutlineSlowMotionVideo, MdSubscriptions, MdOutlineVideoLibrary, MdHistory, MdOutlineWatchLater, MdOutlinePlaylistPlay, MdOutlineDownload} from 'react-icons/md';
import {LuThumbsUp} from 'react-icons/lu';

export const Sidebar = () => {
    const mainLinks = [
        {
            icon: <MdHomeFilled className="text-xl" />,
            name: 'Home'
        },
        {
            icon: <MdOutlineSlowMotionVideo className="text-xl" />,
            name: 'Shorts'
        },
        {
            icon: <MdSubscriptions className="text-xl" />,
            name: 'Subscriptions'
        }
    ]

    const otherLinks = [
        {
            icon: <MdOutlineVideoLibrary className="text-xl" />,
            name: 'Library'
        },
        {
            icon: <MdOutlinePlaylistPlay className="text-xl" />,
            name: 'Playlists'
        },
        {
            icon: <MdHistory className="text-xl" />,
            name: 'History'
        },
        {
            icon: <MdOutlineWatchLater className="text-xl" />,
            name: 'Watch Later'
        },
        {
            icon: <LuThumbsUp className="text-xl" />,
            name: 'Liked Videos'
        },
        {
            icon: <MdOutlineDownload className="text-xl" />,
            name: 'Downloads'
        },
    ]

    return (
        <div className="w-64 bg-[#212121] h-screen overflow-y-auto pb-8 sidebar">
            <div className="px-5 py-2">
                <ul className="flex flex-col border-b border-gray-700">
                    {mainLinks.map(({icon, name}) => {
                        return (
                            <li key={name} className="pb-1">
                                <a href="#" className="flex items-center gap-5 hover:bg-gray-800 p-3 rounded-xl">
                                    {icon}
                                    <span className="text-sm tracking-wider">{name}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <ul className="flex flex-col border-b border-gray-700">
                    {otherLinks.map(({icon, name}) => {
                        return (
                            <li key={name} className="pb-1">
                                <a href="#" className="flex items-center gap-5 hover:bg-gray-800 p-3 rounded-xl">
                                    {icon}
                                    <span className="text-sm tracking-wider">{name}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

