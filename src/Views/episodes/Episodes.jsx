import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getEpisodenumber,getEpisodeDate} from '../../Utils/utils';
import {Search} from '../Stateless/Search';
import {
    fetchSeasons,
    selectEpisodes,
    fetchEpisodes,
    filterEpisodes
} from '../../storeManager/Slices/episodeSlice';
import {
    fetchShow,
    selectShows
} from '../../storeManager/Slices/showSlice';

export function Episodes() {
  const {episodes,seasons} = useSelector(selectEpisodes); // returns the current state of the store for the selected data
  const {show} = useSelector(selectShows);
  const [season,setSeason] =useState(''); 
  const [episode,setEpisode] =useState(''); 
  const {showId} = useParams();
  const dispatch = useDispatch(); // trigger actions from the redux store
  const getEpisode = (e) => {
    e.preventDefault();
    const {value} = e.target
    setEpisode(value)
    dispatch(filterEpisodes({episodes,value})) // trigger filter action to filter episodes
  }
  useEffect(()=>{ // trigger events after render
    dispatch(fetchSeasons(showId))
    dispatch(fetchShow(showId))
    return () => {} // clean/ unsubscribe the events and avoid memory leaks
   
  },[dispatch,showId]) // the arguments in the array re-renders the view for every mutation

  const selectSeason = (e) => {
    e.preventDefault();
    setSeason(e.target.value) // set the new state of the variable
    setEpisode('')
    dispatch(fetchEpisodes(e.target.value))
  }
  return (
      <div className="main">
        <Search getMedia={getEpisode} input={episode} placeholder={"Search Episodes"}  search={getEpisode}/>
        
        <div className="episode-content">
          <div className="row">
            <div className="col-sm-3">
              <div>
                <img className="rounded show-image" src={show.image?.medium} alt={show.name} />
                <h3 className="show-name">{show.name}</h3>
                <p className="show-summary" dangerouslySetInnerHTML={ {__html: show.summary} }/>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="episodes-list">
                <div className="form-group">
                  <select className="form-control select-season" name="season" onChange={selectSeason} value={season}>
                    {seasons.map((seasonInfo, index) => (
                      <option key={index} value={seasonInfo.id}> Season {seasonInfo.number}</option>
                    ))}
                  </select>
                  <i className="fa fa-chevron-down"></i>
                </div>
                {episodes.map((episodeInfo, index) => (
                  <div key={index}>
                    <div className="episode-overview">
                      <div className="episode-number">
                        <h4>{getEpisodenumber(index + 1)}</h4>
                      </div>
                      <div className="episode-details">
                        <h5>{episodeInfo.name}</h5>
                        <div className="episode-extra">
                          <p className="d-flex justify-content-between m-0">
                            <span><i className="fa fa-star mr-1"></i>{episodeInfo.runtime}</span>
                            <span>{getEpisodeDate(episodeInfo.airdate)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
  );
}
