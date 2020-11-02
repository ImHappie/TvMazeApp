import { configureStore } from '@reduxjs/toolkit';
import tvMazeReducer from './Slices/showSlice';
import tvMazeEpisodeReducer from './Slices/episodeSlice';
export default configureStore({
  reducer: {
    shows: tvMazeReducer,
    episodes: tvMazeEpisodeReducer
  },
});
