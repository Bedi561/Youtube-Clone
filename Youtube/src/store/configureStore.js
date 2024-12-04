/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit'
import ytreducer from '../features/yt/ytSlice'

const store = configureStore({
  reducer:{
    YoutubeApp: ytreducer
  }

});


export default store;