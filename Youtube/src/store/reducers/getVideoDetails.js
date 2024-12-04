/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { parseRecommendedData } from "../../utils/parseRecommendedData";
import { convertRawtoString } from "../../utils/convertRawtoString";
import { timeSince } from "../../utils/timeSince";
// import { parseData } from "../../utils/parseData";
const API_KEY = import.meta.env.VITE_APIKEY;
if (!API_KEY) {
    console.error("API Key is missing. Please check your .env file.");
}
export const getVideoDetails = createAsyncThunk(
    "youtube/App/videoDetails",
    async (id) => { // Accept `id` as a parameter
      try {
        console.log("Fetching video details for ID:", id); // Log the ID
        const { data: { items } } = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
        );
  
        if (!items || items.length === 0) {
          console.error("No video details found for the given ID.");
          return null; // Handle this case in your UI
        }
  
        console.log("Video details API response:", items[0]); // Log the API response
        return parseData(items[0]);
      } catch (error) {
        console.error("Error fetching video details:", error);
        throw error; // Propagate the error
      }
    }
  );
  
  const parseData = async (item) => {
    try {
      console.log("Parsing video data:", item); // Log the item being parsed
      const channelResponse = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
      );
  
      const snippet = item.snippet;
      const id = item.id;
      const statistics = item.statistics;
  
      const channelImage = channelResponse.data.items[0].snippet.thumbnails.default.url;
      const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;
  
      console.log("Channel data response:", channelResponse.data); // Log channel data
      return {
        videoId: id,
        videoTitle: snippet.title,
        videoDescription: snippet.description || "No description available",
        videoViews: convertRawtoString(
          statistics?.viewCount || "0"
        ),
        videoLikes: convertRawtoString(
          statistics?.likeCount || "0"
        ),
        videoAge: timeSince(new Date(snippet.publishedAt)),
        channelInfo: {
          id: snippet.channelId,
          image: channelImage,
          name: snippet.channelTitle || "Unknown Channel",
          subscribers: convertRawtoString(subscriberCount, true),
        },
      };
    } catch (error) {
      console.error("Error parsing video data:", error);
      throw error;
    }
  };
  