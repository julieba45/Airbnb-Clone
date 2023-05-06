import React from 'react';

const DeleteReviewModal = ({closeModal, deleteRevew}) => {
    const handleDelete = () => {
        deleteRevew();
        closeModal();
    }
    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete} style={{backgroundColor: "red"}}>
                Yes (Delete Review)
            </button>
            <button onClick={closeModal} style={{backgroundColor: "darkgrey"}}>
                No (Keep Review)
            </button>
        </div>
    )
}


export default DeleteReviewModal;
