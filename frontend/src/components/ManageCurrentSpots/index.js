import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { editSpot, fetchAllSpots, fetchCurrentSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './mcs.css'

const GetAllCurrentSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentSpots = useSelector((state) => state.spots.spotsCurrentUser);


    // useEffect(() => {
    //     if (currentSpots) {
    //         console.log('CurrentSpots in the component:', currentSpots);
    //     }
    // }, [currentSpots]);

    useEffect(() => {
        dispatch(fetchCurrentSpots());
      }, [dispatch]);

      const spotsArray = currentSpots ? Object.values(currentSpots) : [];

      const handleUpdateClick = (spot) => {
        history.push(`/spots/${spot.id}/edit`, { spot });
      };

      return (
        <div>
          <h1>Manage Spots</h1>
          {spotsArray.length > 0 ? (
            <div>
              {spotsArray.map((spot) => (
                <div key={spot.id} className="spot-tile">
                  <NavLink to={`/spots/${spot.id}`} className="spot-tile-link">
                    <img src={spot.previewImage} alt={spot.name} />
                    <h3>{spot.name}</h3>
                    <div>{`${spot.city}, ${spot.state}`}</div>
                    <div>Rating: {spot.avgRating}</div>
                    <div>Price: ${spot.price}</div>
                  </NavLink>
                  <button onClick={() => handleUpdateClick(spot)}>Update</button>
                  <button>Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          )}
        </div>
      );
    };

    export default GetAllCurrentSpots;
