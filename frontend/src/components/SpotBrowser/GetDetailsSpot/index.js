import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../../store/spots";
import { useParams } from 'react-router-dom';

const GetDetailsSpot = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    console.log("id from useParams:", id);

    // console.log("useParams", useParams());
    const spot = useSelector((state) => {
        // console.log('HEYYYY Spot ID:', state.spots.currentSpot)
       return state.spots.currentSpot
    })

    useEffect(() => {
        if (spot) {
            console.log('Spot Images:', spot.SpotImages);
        }
    }, [spot]);


    useEffect(() => {
        dispatch(fetchSpot(id))
    }, [dispatch, id])


    if(!spot){
        return <div>Sorry there is no Spot here</div>
    }

    // if(!spot.SpotImages.url){

    // }

    const handleReserveClick = () => {
        alert("Feature coming soon");
    };

    return (
        <div>
            <h1>{spot.name}</h1>
            <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <div>
                {/* <img src={spot.SpotImages} alt={spot.name} /> */}
                {spot.SpotImages && spot.SpotImages.length > 0 ? (
                <div>
                    {spot.SpotImages.map((obj, index) => (
                        // <>
                        // {console.log(obj)}
                         <img key={index} src={obj.url} alt={`Spot image ${"index + 1"}`} />
                        // </>

                    ))}
                </div>
            ): (
                <div>No images available for this spot</div>
            )}
            </div>
            <p>Hosted</p>
            <div>
                <p>{spot.price} per night</p>
                <button onClick={handleReserveClick}>Reserve</button>
            </div>
        </div>
    )
}

export default GetDetailsSpot
