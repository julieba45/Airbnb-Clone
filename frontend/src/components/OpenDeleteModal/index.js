
import React from "react";
import { useDispatch } from "react-redux";
import { removeSpot, fetchCurrentSpots } from "../../store/spots";
import deleteSpot from "./opendelmodal.module.css"

const DeleteConfirmationModal = ({spotId, closeModal}) => {
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(removeSpot(spotId));
        dispatch(fetchCurrentSpots());
        closeModal();
    };
    return (
        <div  className={deleteSpot.container}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className={deleteSpot.yesDelBtn} onClick={handleDelete}>
                Yes (Delete Spot)
            </button>
            <button className={deleteSpot.noDelBtn} onClick={closeModal}>
                No (keep spot)
            </button>
        </div>
    )
}

export default DeleteConfirmationModal
