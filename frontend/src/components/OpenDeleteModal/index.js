
import React from "react";
import { useDispatch } from "react-redux";
import { removeSpot, fetchCurrentSpots } from "../../store/spots";

const DeleteConfirmationModal = ({spotId, closeModal}) => {
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(removeSpot(spotId));
        dispatch(fetchCurrentSpots());
        closeModal();
    };
    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={handleDelete}style={{ background: 'red'}}>
                Yes (Delete Spot)
            </button>
            <button onClick={closeModal}style={{ background: 'darkgrey'}}>
                No (keep spot)
            </button>
        </div>
    )
}

export default DeleteConfirmationModal
