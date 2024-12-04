/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducers/getHomePageVideos";
import { getRecommendedVideo } from "../../store/reducers/getRecommendedVideo";
import { getVideoDetails } from "../../store/reducers/getVideoDetails";
// import { stat } from "fs";

const initialState = {
    video: [],
    currentPlaying: null,
    searchTerm: "",
    searchResults: [],
    nextPageToken: null,
    recommendedVideo: []
}

const ytSlice = createSlice({
    name: 'YoutubeApp',
    initialState,
    reducers: {
      clearVideos: (state) => {
        state.video = [];
        state.nextPageToken = null;
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getHomePageVideos.fulfilled,(state, action) =>{
            if(action.payload && action.payload.parsedData){
                state.video = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            }
        });
      builder.addCase(getRecommendedVideo.fulfilled, (state, action) => {
        if (action.payload && action.payload.parsedData) {
          state.recommendedVideo = action.payload.parsedData;
        }
      });
      builder.addCase(getVideoDetails.fulfilled, (state, action) => {
        if (action.payload) {
          // Directly set currentPlaying to the parsed video data
          state.currentPlaying = action.payload;
        }
      });
    }
  });
  
  export const { clearVideos } = ytSlice.actions;
  export default ytSlice.reducer;
  