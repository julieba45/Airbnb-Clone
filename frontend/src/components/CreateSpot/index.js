import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSpot, createSpotImage } from "../../store/spots";

const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
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
            if (!previewImageUrl) errors.previewImageUrl= "Preview Image URL is required";
            if (!imageUrl){
              errors.imageUrl = "Image URL is required"
            }else if(!/\.(jpg|jpeg|png)/i.test(imageUrl)){
              errors.imageUrl = "Image URL must end in .jpg, .jpeg or .png"
            }
           return errors
    }


    useEffect(() => {
        if(touched){
            setErrors(validateForm)
        }
    }, [touched, country, address, city, state, description,lat,lng, name, price, previewImageUrl])



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
            const newSpot = await dispatch(addSpot(spotData))
            console.log('-------NEW SPOT FROM COMPONENT', newSpot)
            if(newSpot){
              const allImageUrls = [imageUrl, previewImageUrl];
              for(const url of allImageUrls){
                if(url){
                  const preview = (url === previewImageUrl);
                  await dispatch(createSpotImage(newSpot.id, url, preview))
                }
              }
              history.push(`/spots/${newSpot.id}`)
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <h1>Create a New Spot</h1>
           {/* ... */}
          <h2>Where's your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a reservation.
          </p>
          <label>
            Country
            <input
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          {errors.country && (
            <div style={{ color: "red" }}>{errors.country}</div>
            )}
          <label>
            Street Address
            <input
              type="text"
              value={address}
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {errors.address && (
            <div style={{ color: "red" }}>{errors.address}</div>
            )}
          <label>
            City
            <input
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          {errors.city  && (
            <div style={{ color: "red" }}>{errors.city}</div>
            )}
          <label>
            State
            <input
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          {errors.state  && (
            <div style={{ color: "red" }}>{errors.state}</div>
            )}
          <label>
            Latitude
            <input
              type="text"
              value={lat}
              placeholder="Lat"
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          {errors.lat  && (
            <div style={{ color: "red" }}>{errors.lat}</div>
            )}
          <label>
            Longitude
            <input
              type="text"
              value={lng}
              placeholder="Lng"
              onChange={(e) => setLng(e.target.value)}
            />
          </label>
          {errors.lng  && (
            <div style={{ color: "red" }}>{errors.lng}</div>
            )}
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <label>
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {errors.description  && (
            <div style={{ color: "red" }}>{errors.description}</div>
            )}

          <h2>Create a title for your Spot</h2>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special
          </p>
          <label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {errors.name && (
            <div style={{ color: "red" }}>{errors.name}</div>
            )}

          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher in
            search results.
          </p>
          <label>
            <input
              type="text"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {errors.price && (
            <div style={{ color: "red" }}>{errors.price}</div>
            )}

          <h2>Liven up your spot with photos</h2>
          <p>
           Submit a link to at least one photo to publish your spot.
          </p>
          <label>
            <input
              type="text"
              value={previewImageUrl}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImageUrl(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              value={imageUrl}
              placeholder="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          {errors.imageUrl && (
            <div style={{ color: "red" }}>{errors.imageUrl}</div>
            )}

          <button type="submit">Submit</button>
  </form>
    )

}

export default CreateSpot
