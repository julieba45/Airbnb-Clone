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
        <div className='outermost-container-tiles'>
            {/* <h1>All Spots</h1> */}
            {spotArray && spotArray.length > 0 ? (
                <div  className='spot-grid'>
                    {spotArray.map((spot) => (
                        <NavLink to={`/spots/${spot.id}`} key={spot.id} className="spot-card">
                        <div key={spot.id}>
                            <div className='description'>
                                <div className='image-container'>
                                    {spot.previewImage && spot.previewImage !== 'no spot preview image found' ? (
                                        <img src={spot.previewImage} alt={spot.name} />
                                    ) : (
                                        // Render alternative content or a placeholder image here
                                        <div>No preview image available</div>
                                    )}
                                </div>
                                <h3 className='cityandstate'>{spot.city}, {spot.state}</h3>

                                {/* <p>
                                        Raw value: {spot.avgRating}
                                </p> */}
                                <p>
                                    <i className="fas fa-star"></i>
                                    {spot.avgRating === 0 || spot.avgRating === null || spot.avgRating === "no reviews"
                                        ? "New": `${Number(spot.avgRating).toFixed(1)} stars`
                                    }
                                </p>

                                <p>${spot.price} night</p>
                            </div>
                        </div>
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
