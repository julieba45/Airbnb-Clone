import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editSpot } from "../../store/spots";
import { useParams } from 'react-router-dom';
import editspotstyles from "./editSpots.module.css"
const UpdateSpot = ({spot}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(spot.name);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    // const [previewImageUrl, setPreviewImageUrl] = useState(spot.previewImageUrl);
    // const [imageUrls, setImageUrls] = useState(spot.imageUrls || ["", "", "", ""]);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState(false);

    const validateForm = () => {
        const errors = {};
            if (!name) errors.name = "Name of your spot is required";
            if (!country) errors.country = "Country is required";
            if (!address) errors.address = "Street address is required";
            if (!city) errors.city = "City is required";
            if (!state) errors.state = "State is required";
            if (!lat) errors.lat = "Latitude is required";
            if (!lng) errors.lng = "Longitude is required";
            if (!description || description.length < 30)
            errors.description = "Description needs 30 or more characters";
            if (!price) errors.price = "Price per night is required";
            // if (!previewImageUrl) errors.previewImageUrl= "Preview Image URL is required";
           return errors
    }


    useEffect(() => {
        if(touched){
            setErrors(validateForm)
        }
    }, [touched, country, address, city, state, description,lat,lng, name, price])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched(true);

        const errors = validateForm();
        setErrors(errors)

        console.log('ERRORS', errors)
        if (Object.keys(errors).length === 0){
            const spotData = {
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            }
            console.log('SPOTDATA', spotData)
            const editedSpot = await dispatch(editSpot(id, spotData))
            console.log('-------NEW SPOT FROM COMPONENT', editedSpot)
            if(editedSpot){
                history.push(`/spots/${editedSpot.id}`)
            }
        }

    };

    return (
        <form onSubmit={handleSubmit} className={editspotstyles.container}>
          <h1 className={editspotstyles.heading}>Create a New Spot</h1>
           {/* ... */}
          <h2 className={editspotstyles.subheading}>Where's your place located?</h2>
          <p className={editspotstyles.paragraph}>
            Guests will only get your exact address once they booked a reservation.
          </p>
          <label className={editspotstyles.label}>
            Country
            <input  className={editspotstyles.input}
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          {errors.country && (
            <div style={{ color: "red" }}>{errors.country}</div>
            )}
          <label className={editspotstyles.label}>
            Street Address
            <input className={editspotstyles.input}
              type="text"
              value={address}
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {errors.address && (
            <div style={{ color: "red" }}>{errors.address}</div>
            )}
          <label className={editspotstyles.label}>
            City
            <input className={editspotstyles.input}
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          {errors.city  && (
            <div style={{ color: "red" }}>{errors.city}</div>
            )}
          <label className={editspotstyles.label}>
            State
            <input className={editspotstyles.input}
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          {errors.state  && (
            <div style={{ color: "red" }}>{errors.state}</div>
            )}
          <label className={editspotstyles.label}>
            Latitude
            <input className={editspotstyles.input}
              type="text"
              value={lat}
              placeholder="Lat"
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          {errors.lat  && (
            <div style={{ color: "red" }}>{errors.lat}</div>
            )}
          <label className={editspotstyles.label}>
            Longitude
            <input className={editspotstyles.input}
              type="text"
              value={lng}
              placeholder="Lng"
              onChange={(e) => setLng(e.target.value)}
            />
          </label>
          {errors.lng  && (
            <div style={{ color: "red" }}>{errors.lng}</div>
            )}
          <h2 className={editspotstyles.subheading}>Describe your place to guests</h2>
          <p className={editspotstyles.paragraph}>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <label className={editspotstyles.label}>
            <input className={editspotstyles.input}
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {errors.description  && (
            <div style={{ color: "red" }}>{errors.description}</div>
            )}

          <h2 className={editspotstyles.subheading}>Create a title for your Spot</h2>
          <p className={editspotstyles.paragraph}>
            Catch guests' attention with a spot title that highlights what makes
            your place special
          </p>
          <label className={editspotstyles.label}>
            <input className={editspotstyles.input}
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {errors.name && (
            <div style={{ color: "red" }}>{errors.name}</div>
            )}

          <h2 className={editspotstyles.subheading}>Set a base price for your spot</h2>
          <p className={editspotstyles.paragraph}>
            Competitive pricing can help your listing stand out and rank higher in
            search results.
          </p>
          <label className={editspotstyles.label}>
            <input className={editspotstyles.input}
              type="text"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {errors.price && (
            <div style={{ color: "red" }}>{errors.price}</div>
            )}

          {/* <h2>Liven up your spot with photos</h2> */}
          <p className={editspotstyles.paragraph}>
           Submit a link to at least one photo to publish your spot.
          </p>
          {/* <label>
            <input
              type="text"
              value={previewImageUrl}
              placeholder="Price"
              onChange={(e) => setPreviewImageUrl(e.target.value)}
            />
          </label> */}

          <button type="submit">Submit</button>
  </form>
    )

}

export default UpdateSpot
