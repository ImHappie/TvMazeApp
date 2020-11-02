import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const tvMazeSlice = createSlice({
  name: 'tvMaze',
  initialState: {
    shows: [],
    show: {}
  },
  reducers: {
    getShows: (state,{payload}) => {
      state.shows = payload;
    },
    getShowInfo: (state, {payload}) => {
      state.show = payload
    }
  },
});

export const { getShows,getShowInfo } = tvMazeSlice.actions;

export const fetchShows = (show) => async dispatch => {
  const data = await axios.get(`http://api.tvmaze.com/search/shows?q=${show}`)
  dispatch(getShows(data.data));
};
export const fetchShow = (showId) => async dispatch => {
  const data = await axios.get(`http://api.tvmaze.com/shows/${showId}`)
  dispatch(getShowInfo(data.data));
};


export const selectShows = state => state.shows;

export default tvMazeSlice.reducer;
