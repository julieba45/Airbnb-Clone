import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCurrentSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { removeSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import DeleteConfirmationModal from '../OpenDeleteModal';
import './mcs.css'


const GetAllCurrentSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentSpots = useSelector((state) => state.spots.spotsCurrentUser);
    const { setModalContent, closeModal} = useModal();

    const openDeleteConfirmation = (spotId) => {
      setModalContent(
        <DeleteConfirmationModal spotId={spotId} closeModal={closeModal}/>
      )
    }


    useEffect(() => {
        if (currentSpots) {
            console.log('CurrentSpots in the component:', Object.values(currentSpots));
        }
    }, [currentSpots]);

    useEffect(() => {
        dispatch(fetchCurrentSpots());
      }, [dispatch]);

      const spotsArray = currentSpots ? Object.values(currentSpots) : [];

      const handleUpdateClick = (spot) => {
        history.push(`/spots/${spot.id}/edit`, { spot });
      };

      return (

        <div>
          <h1 className='manage-spots-heading'>Manage Spots</h1>
          {spotsArray.length > 0 ? (
            <div className='manage-spots-grid'>
              {spotsArray.map((spot) => (
                <div key={spot.id} className="spot-tile">
                  <NavLink to={`/spots/${spot.id}`} className="spot-tile-link">
                    <div className='manage-image-container'>
                      <img src={spot.previewImage} alt={spot.name} />
                    </div>
                    {/* <h3>{spot.name}</h3> */}

                    <div className='locationplusstar'>
                      <div>{`${spot.city}, ${spot.state}`}</div>
                      {/* <div>Rating: {spot.avgRating}</div>
                      <div>Price: ${spot.price}</div> */}
                      <p>
                        <i className="fas fa-star icon"></i>
                        {spot.avgRating === 0 || spot.avgRating === null || spot.avgRating === "no reviews"
                          ? "New" : `${Number(spot.avgRating).toFixed(1)}`
                        }
                      </p>
                    </div>

                    <p>${spot.price} night</p>

                  </NavLink>
                  <button onClick={() => handleUpdateClick(spot)}>Update</button>
                  <button onClick={() => openDeleteConfirmation(spot.id)}>Delete</button>
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
