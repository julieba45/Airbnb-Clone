import React from "react";
import './star.css';

const Star = ({filled, onMouseEnter, onMouseLeave, onClick}) => {
    const starClass = filled ? 'star filled' : 'star';
    return (
        <span
        className={starClass}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        >
            ★
        </span>
    )
}
export default Star;
