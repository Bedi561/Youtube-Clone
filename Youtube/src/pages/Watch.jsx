import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { useEffect } from "react";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideo } from "../store/reducers/getRecommendedVideo";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { IoShareOutline } from 'react-icons/io5';
import { MdOutlineFileDownload } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const Watch = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentPlaying = useAppSelector((state) => state.YoutubeApp.currentPlaying);
    const recommendedVideos = useAppSelector((state) => state.YoutubeApp.recommendedVideo);

    useEffect(() => {
        if (id) {
            dispatch(getVideoDetails(id));
        } else {
            navigate("/");
        }
    }, [id, dispatch, navigate]);

    useEffect(() => {
        if (currentPlaying && id) {
            dispatch(getRecommendedVideo(id));
        }
    }, [currentPlaying, dispatch, id]);

    if (!currentPlaying || currentPlaying?.videoId !== id) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar className="w-60 flex-shrink-0 hidden md:block" />
                <main className="flex-1 overflow-auto p-6">
                    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="aspect-video mb-4">
                                <iframe
                                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                    frameBorder="0"
                                    allowFullScreen
                                    title="YouTube video player"
                                    className="w-full h-full"
                                />
                            </div>
                            <h1 className="text-xl font-bold mb-2">{currentPlaying.videoTitle}</h1>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={currentPlaying.channelInfo.image}
                                        alt={currentPlaying.channelInfo.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{currentPlaying.channelInfo.name}</h2>
                                        <p className="text-sm text-gray-500">{currentPlaying.channelInfo.subscribers} subscribers</p>
                                    </div>
                                    <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
                                        Subscribe
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="flex items-center bg-gray-700 hover:bg-gray-500 px-3 py-2 rounded-full">
                                        <AiOutlineLike className="mr-2 h-5 w-5" />
                                        {currentPlaying.videoLikes}
                                    </button>
                                    <button className="flex items-center bg-gray-700 hover:bg-gray-500 px-3 py-2 rounded-full">
                                        <AiOutlineDislike className="mr-2 h-5 w-5" />
                                    </button>
                                    <button className="flex items-center bg-gray-700 hover:bg-gray-500 px-3 py-2 rounded-full">
                                        <IoShareOutline className="mr-2 h-5 w-5" />
                                        Share
                                    </button>
                                    <button className="flex items-center bg-gray-700 hover:bg-gray-500 px-3 py-2 rounded-full">
                                        <MdOutlineFileDownload className="mr-2 h-5 w-5" />
                                        Download
                                    </button>
                                    <button className="flex items-center bg-gray-700 hover:bg-gray-500 p-2 rounded-full">
                                        <BsThreeDotsVertical className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="font-semibold">{currentPlaying.videoViews} views • {currentPlaying.videoAge}</p>
                                <p className="mt-2">{currentPlaying.videoDescription}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Recommended videos</h3>
                            {recommendedVideos.map((video) => (
                                <div key={video.videoId} className="flex space-x-2">
                                    <img src={video.videoThumbnail} alt={video.videoTitle} className="w-40 h-24 object-cover" />
                                    <div>
                                        <h4 className="font-semibold line-clamp-2">{video.videoTitle}</h4>
                                        <p className="text-sm text-gray-500">{video.channelInfo.name}</p>
                                        <p className="text-sm text-gray-500">{video.videoViews} views • {video.videoAge}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

