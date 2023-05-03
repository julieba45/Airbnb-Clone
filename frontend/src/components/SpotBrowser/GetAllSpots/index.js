import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../../store/spots'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

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
                <ul>
                    {spotArray.map((spot) => (
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
                                <div>
                                    <NavLink to={`/spots/${spot.id}`}>{spot.city}</NavLink>
                                </div>
                                <div>${spot.price}</div>
                                <div>{spot.avgRating} stars</div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No spots available</div>
            )}
        </div>
    );
};

export default GetAllSpots
