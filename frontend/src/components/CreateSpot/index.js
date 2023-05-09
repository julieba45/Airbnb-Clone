import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSpot, createSpotImage } from "../../store/spots";
import styles from "./CreateSpot.module.css"

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
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("");
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
        <form onSubmit={handleSubmit} className={styles.container}>
          <h1 className={styles.heading}>Create a New Spot</h1>
           {/* ... */}
          <h2 className={styles.subheading}>Where's your place located?</h2>
          <p className={styles.paragraph}>
            Guests will only get your exact address once they booked a reservation.
          </p>
          <label className={styles.label}>
            Country
            <input
              className={styles.input}
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          {errors.country && (
            <div className={styles.error}>{errors.country}</div>
            )}
          <label className={styles.label}>
            Street Address
            <input
              className={styles.input}
              type="text"
              value={address}
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {errors.address && (
            <div className={styles.error}>{errors.address}</div>
            )}
          <label className={styles.label}>
            City
            <input
              className={styles.input}
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          {errors.city  && (
            <div className={styles.error}>{errors.city}</div>
            )}
          <label className={styles.label}>
            State
            <input
              className={styles.input}
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          {errors.state  && (
            <div className={styles.error}>{errors.state}</div>
            )}
          <label className={styles.label}>
            Latitude
            <input
              className={styles.input}
              type="text"
              value={lat}
              placeholder="Lat"
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          {errors.lat  && (
            <div className={styles.error}>{errors.lat}</div>
            )}
          <label className={styles.label}>
            Longitude
            <input
              className={styles.input}
              type="text"
              value={lng}
              placeholder="Lng"
              onChange={(e) => setLng(e.target.value)}
            />
          </label>
          {errors.lng  && (
            <div className={styles.error}>{errors.lng}</div>
            )}
          <h2 className={styles.subheading}>Describe your place to guests</h2>
          <p className={styles.paragraph}>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={description}
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {errors.description  && (
            <div className={styles.error}>{errors.description}</div>
            )}

          <h2 className={styles.subheading}>Create a title for your Spot</h2>
          <p className={styles.paragraph}>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={name}
              placeholder="Name of your spot"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {errors.name && (
            <div className={styles.error}>{errors.name}</div>
            )}

          <h2 className={styles.subheading}>Set a base price for your spot</h2>
          <p className={styles.paragraph}>
            Competitive pricing can help your listing stand out and rank higher in
            search results.
          </p>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={price}
              placeholder="Price per night (USD)"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {errors.price && (
            <div className={styles.error}>{errors.price}</div>
            )}

          <h2 className={styles.subheading}>Liven up your spot with photos</h2>
          <p className={styles.paragraph}>
           Submit a link to at least one photo to publish your spot.
          </p>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={previewImageUrl}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImageUrl(e.target.value)}
            />
          </label>
            {errors.previewImageUrl && (
            <div className={styles.error}>{errors.previewImageUrl}</div>
            )}
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={imageUrl}
              placeholder="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label >
          {errors.imageUrl && (
            <div className={styles.error}>{errors.imageUrl}</div>
            )}
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={imageUrl2}
              placeholder="Image URL"
              onChange={(e) => setImageUrl2(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={imageUrl3}
              placeholder="Image URL"
              onChange={(e) => setImageUrl3(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              value={imageUrl4}
              placeholder="Image URL"
              onChange={(e) => setImageUrl4(e.target.value)}
            />
          </label>
          <button type="submit" className={styles.submitButton}>Create Spot</button>
  </form>
    )

}

export default CreateSpot
