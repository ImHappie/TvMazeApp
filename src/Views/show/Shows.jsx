import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {Search} from '../Stateless/Search';
import {
  fetchShows,
  selectShows,
} from '../../storeManager/Slices/showSlice';

export function Shows() {
  const {shows} = useSelector(selectShows); // returns the current state of the store for the selected data
  const [show,setShow] = useState('');
  const dispatch = useDispatch(); // trigger actions from the redux store
  const getShow = (e) => {
    e.preventDefault();
    const {value} = e.target
    setShow(value)
  }
  const searchShow = (e) => {
    e.preventDefault();
    dispatch(fetchShows(show)) // trigger fetch action to return shows
  }
  useEffect(()=>{ // trigger events after render
    return () => {} // clean/ unsubscribe the events and avoid memory leaks
  },[]) // the arguments in the array re-renders the view for every mutation
  return ( 
      <div className="main">
        <Search getMedia={getShow} input={show} placeholder={"Search Shows"} search={searchShow}/>
        <div className="movies-list">
            {shows.map((showInfo,index)=>(
            <div className="container" key={index}>
              <div className="row bg-grey">
                <div className="col-sm-3">
                  <div className="movie-image">
                    <img src={showInfo.show.image?.medium} alt={showInfo.show.name}/>
                  </div>
                </div>
                <div className="col-sm-6 col-sm-offset-3">
                  <div className="movie-details">
                    <h2>{showInfo.show.name}</h2>
                    <p className="movie-content" dangerouslySetInnerHTML={ {__html: showInfo.show.summary} }/>
                    <Link className="btn btn-primary search-button" to={`/show/${showInfo.show.id}`}>Show Episodes</Link>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
  );
}
