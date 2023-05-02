import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../../store/spots";
import { useParams } from 'react-router-dom';

const GetDetailsSpot = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    console.log("useParams", useParams());
    const spot = useSelector((state) => {
        console.log('Spot ID:', state)
       return state.spots.spots[id]
    })


    useEffect(() => {
        dispatch(fetchSpot(id))
    }, [dispatch])

    if(!spot){
        return <div>Sorry there is no Spot here</div>
    }
    return (
        <div>
            <h1>Spot Details Go in Here</h1>
        </div>
    )
}

export default GetDetailsSpot
