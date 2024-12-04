/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { Spinner } from "../components/Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card } from "../components/Card";

export const Home = () => {

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.YoutubeApp.video);

  
  // Log videos after getting them from Redux store
  console.log("Videos from Redux Store:", videos);
  console.log("Videos length:", videos.length); // Log the length of the videos array

  useEffect(() => {
    console.log("Dispatching getHomePageVideos action");
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-auto">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {
          videos.length ? (
            <InfiniteScroll
              key="home-infinite-scroll"
              dataLength={videos.length}
              next={() => {
                console.log("Loading next set of videos...");
                dispatch(getHomePageVideos(true));
              }}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={650}>
              <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                {videos.map((item, index) => {
                  // Log each item to check if it's rendering
                  // console.log(`Rendering card for item at index ${index}:`, item);
                  return <Card data={item} key={item.videoId} />;
                })}
              </div>
            </InfiniteScroll>
          ) : (
            <Spinner />
          )
        }
      </div>
    </div>
  );
}
