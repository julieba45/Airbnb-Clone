import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../../store/spots'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './spottiles.css'

const GetAllSpots = () => {

    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.spots);
    const spotArray = spots ? Object.values(spots) : null;
    // console.log('HEYYYYYYYYYYYYYY', spotArray)

    useEffect(() => {
        dispatch(fetchAllSpots());
    }, [dispatch]);

    return (
        <div>
            <h1>All Spots</h1>
            {spotArray && spotArray.length > 0 ? (
                <div  className='spot-grid'>
                    {spotArray.map((spot) => (
                        <NavLink to={`/spots/${spot.id}`} key={spot.id} className="spot-card">
                        <li key={spot.id}>
                            <div className='description'>
                                <div>
                                    {spot.previewImage && spot.previewImage !== 'no spot preview image found' ? (
                                        <img src={spot.previewImage} alt={spot.name} />
                                    ) : (
                                        // You can render alternative content or a placeholder image here
                                        <div>No preview image available</div>
                                    )}
                                </div>
                                <h3>{spot.city}</h3>
                                <p>${spot.price}</p>
                                <p>{spot.avgRating} stars</p>
                            </div>
                        </li>
                        </NavLink>
                    ))}
                </div>
            ) : (
                <div>No spots available</div>
            )}
        </div>
    );
};

export default GetAllSpots
