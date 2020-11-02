import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const tvMazeEpisodeSlice = createSlice({ // Simplifies the action and reducer boilerplate
  name: 'tvMaze',
  initialState: {
    episodes: [],
    seasons: []
  },
  reducers: {
    getSeasons: (state,{payload}) => {
      state.seasons = payload;
    },
    getEpisodes: (state, {payload}) => {
        state.episodes = payload;
    },
    filterEpisodes: (state,{payload}) => {
        state.episodes = payload.episodes.filter(x => new RegExp(payload.value, "i").test(x.name)); // filter episodes by name
    }
  },
});
// Actions
export const { getSeasons,getEpisodes, filterEpisodes } = tvMazeEpisodeSlice.actions;

export const fetchSeasons= (showId) => async dispatch => {
  const data = await axios.get(`http://api.tvmaze.com/shows/${showId}/seasons`)
  dispatch(getSeasons(data.data));
  dispatch(fetchEpisodes(data.data[0].id));
};
export const fetchEpisodes= (seasonId) => async dispatch => {
    const data = await axios.get(`http://api.tvmaze.com/seasons/${seasonId}/episodes`)
    dispatch(getEpisodes(data.data));
  };

export const selectEpisodes = state => state.episodes;

export default tvMazeEpisodeSlice.reducer;
