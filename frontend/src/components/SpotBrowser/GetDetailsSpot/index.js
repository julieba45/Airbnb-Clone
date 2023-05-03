import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../../store/spots";
import { useParams } from 'react-router-dom';

const GetDetailsSpot = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    console.log("useParams", useParams());
    const spot = useSelector((state) => {
        // console.log('Spot ID:', state)
       return state.spots.spots[id]
    })

    useEffect(() => {
        dispatch(fetchSpot(id))
    }, [dispatch])

    if(!spot){
        return <div>Sorry there is no Spot here</div>
    }

    const handleReserveClick = () => {
        alert("Feature coming soon");
    };

    return (
        <div>
            <h1>Spot name</h1>
            <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <div>
                {/* <img src={} alt={spot.name} /> */}
                <div>
                    {/* {spot.SpotImages.map((url, index) => (
                        <img key={index} src={url} alt={`Spot image ${index + 1}`} />
                    ))} */}
                </div>
            </div>
            <p>Hosted</p>
            <div>
                <p>{spot.price} night</p>
                <button onClick={handleReserveClick}>Reserve</button>
            </div>
        </div>
    )
}

export default GetDetailsSpot
