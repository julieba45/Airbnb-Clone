import React from 'react';
import deleteReviewcss from "./index.module.css"

const DeleteReviewModal = ({closeModal, deleteReview}) => {
    const handleDelete = () => {
        deleteReview();
        closeModal();
    }
    return (
        <div className={deleteReviewcss.delRevcontainer}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className={deleteReviewcss.yesDelBtn}onClick={handleDelete}>
                Yes (Delete Review)
            </button>
            <button className={deleteReviewcss.noDelBtn} onClick={closeModal} >
                No (Keep Review)
            </button>
        </div>
    )
}


export default DeleteReviewModal;
