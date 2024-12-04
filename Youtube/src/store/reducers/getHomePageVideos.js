/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { parseData } from "../../utils/parseData";

const API_KEY = import.meta.env.VITE_APIKEY;
if (!API_KEY) {
    console.error("API Key is missing. Please check your .env file.");
  }
export const getHomePageVideos = createAsyncThunk(
    "youtube/App/homePageVideos",
    async(isNext, { getState }) => {
        const { YoutubeApp: { nextPageToken, video } } = getState();

        // Await the axios request to get data from YouTube
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="Mr Beast"&key=${API_KEY}&part=snippet${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`);
        
        const items = response.data.items;
        // console.log("Helllooooo",items); // Check what the response items look like

        // Parse the items
        const parsedData = await parseData(items);
        //console.log("Parsed Data:", parsedData);

        // Return the parsed data and the nextPageToken for pagination
        return {
            parsedData: [...video, ...parsedData], // Combine previous videos with the new ones
            nextPageToken: response.data.nextPageToken, // Use the new nextPageToken for pagination
        };
    }
)
