/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios';

import { parseVideoDuration } from './parseVideoDuration';
import { convertRawtoString } from './convertRawtoString';
import { timeSince } from './timeSince';
const API_KEY = import.meta.env.VITE_APIKEY;


export const parseRecommendedData = async (items) => {
  // console.log("Parsing items:", items);
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach(item => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    // Fetch channel data
    const { data: { items: channelsData } } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(',')}&key=${API_KEY}`);

    const parsedChannelData = [];
    channelsData.forEach((channel) => parsedChannelData.push({
      id: channel.id,
      image: channel.snippet.thumbnails.default.url
    }));

    // Fetch video data
    const { data: { items: videoData } } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`);

    const parsedData = [];
//     console.log("Items:", items);
// console.log("Video Data:", videoData);
// console.log("Items Length:", items.length);
// console.log("Video Data Length:", videoData.length);


items.forEach((item, index) => {
  // Ensure item.snippet exists
  if (!item.snippet) {
    console.warn(`Missing snippet data for item with id: ${item.id}`);
    return;
  }

  // Match channel data
  const channelMatch = parsedChannelData.find((data) => data.id === item.snippet.channelId);
  if (!channelMatch) {
    console.warn(`No channel data found for channelId: ${item.snippet.channelId}`);
    return;
  }
  const { image: channelImage } = channelMatch;

  // Ensure videoData[index] exists
  const videoInfo = videoData.find((video) => video.id === item.id.videoId);
  if (!videoInfo || !videoInfo.contentDetails || !videoInfo.statistics) {
    console.warn(`No matching videoData found for videoId: ${item.id.videoId}`);
    return;
  }

  // Process and push parsed data
  parsedData.push({
    videoId: item.id.videoId,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description || "No description available",
    videoThumbnail: item.snippet.thumbnails?.medium?.url || "No thumbnail available",
    videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    videoDuration: parseVideoDuration(
      videoInfo.contentDetails?.duration || "PT0S" // Default to 0 duration if missing
    ),
    videoViews: convertRawtoString(
      videoInfo.statistics?.viewCount || "0" // Default to 0 views if missing
    ),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle || "Unknown Channel"
    }
  });
});


    return parsedData;

  } catch (err) {
    console.log("Hi You have an error!", err)
  }

}
