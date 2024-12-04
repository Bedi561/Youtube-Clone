/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { parseRecommendedData } from "../../utils/parseRecommendedData";

const API_KEY = import.meta.env.VITE_APIKEY;
if (!API_KEY) {
    console.error("API Key is missing. Please check your .env file.");
}

export const getRecommendedVideo = createAsyncThunk(
    "youtube/App/getRecommendedVideo",
    async (videoId, { getState }) => {
        console.log("getRecommendedVideo called with videoId:", videoId); // Log the videoId received

        try {
            // Extract the current playing video's channelId from state
            const {
                YoutubeApp: { currentPlaying },
            } = getState();

            console.log("Current Playing State:", currentPlaying); // Log the currentPlaying state

            if (!currentPlaying || !currentPlaying.channelInfo) {
                console.error("No channel info found in currentPlaying state.");
                return { parsedData: [] };
            }

            const { id: channelId } = currentPlaying.channelInfo;
            console.log("Extracted Channel ID:", channelId); // Log the extracted channelId

            // Fetch related videos using `relatedToVideoId`
            const response = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/search`, {
                    params: {
                        key: API_KEY,
                        part: "snippet",
                        maxResults: 20,
                        type: "video",
                        q: "Mr beast videos" // Optional query to fetch general videos
                    }
                }
            );
            

            console.log("API Response for Recommended Videos:", response.data); // Log the raw API response

            const items = response.data.items;
            if (!items || items.length === 0) {
                console.warn("No recommended videos found."); // Log a warning if no videos are found
            } else {
                console.log("Number of Recommended Videos Fetched:", items.length); // Log the number of videos fetched
            }

            // Parse the items using a utility function
            const parsedData = await parseRecommendedData(items, videoId);

            console.log("Parsed Recommended Videos Data:", parsedData); // Log the parsed data
            return { parsedData };
        } catch (error) {
            console.error("Error fetching recommended videos:", error); // Log the error message
            return { parsedData: [] };
        }
    }
);
