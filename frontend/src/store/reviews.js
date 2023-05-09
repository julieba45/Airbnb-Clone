import { csrfFetch } from "./csrf";

//action types
const GET_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE';

//action creators
const getAllReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

//thunk action creators
export const fetchReviewsBySpotId = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    console.log('DA RESPONSE', data.Reviews)
    dispatch(getAllReviews(data.Reviews))
}

export const createReviewBySpotId = (spotId, review) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    // const errorData = await response.json();
    console.log('--------Finish fetching')
    if(response.ok){
        console.log('--------- RESPONSE IS OK')
        const newreview = await response.json();
        // newreview.spotId = spotId    //////////////////////////////////
        dispatch(createReview(newreview))
        return newreview
    }else {
        // console.log('------------RESPONSE IS NOT OK')
        if(response.status === 403){
            throw { message: "User already has a review for this spot" };
        } else {
            throw { message: "The provided review data was invalid" };
        }

    }
}

export const removeReview = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(deleteReview(id))
    }
}

const initialState = {
    reviewsBySpotId: {}
}
const reviewsReducer = (state = initialState, action) => {
    console.log('------------- AT REVIEW REDUCER')
    switch(action.type){
        case GET_REVIEWS:
            // console.log('HEY IM IN THE GETREVIEWS CASE')
            console.log('ACTION', action)
            // const reviewsById = {}
            // action.reviews.forEach(review => {
            //     reviewsById[review.id] = review;
            // });
            return {
                ...state,
                reviewsBySpotId: {
                    // ...state.reviewsBySpotId,
                    [action.reviews[0].spotId]: action.reviews,
                }

            }
        case CREATE_REVIEW:
            // const newReview = action;
            // const spotId = newReview.spotId;

            // console.log("----ACTION", action)
            // console.log("------Old State", state)

            // const newerState = { ...state };
            // if (!newerState.reviewsBySpotId[action.review.spotId]){
            //     newerState.reviewsBySpotId[action.review.spotId] = [];
            // }
            // newerState.reviewsBySpotId[action.review.spotId].push(action.review);
            // console.log("------NEW STATE", newerState)
            // return newerState
            let newstate = {...state}
            newstate.reviewsBySpotId[action.review.spotId] = action.review
            return newstate
                // reviewsBySpotId: {[action.review.spotId] : action.review}



        case DELETE_REVIEW:
            console.log('STATE', state)
            console.log('ACTION', action)
            const spotId = Object.keys(state.reviewsBySpotId)
            console.log('spotID', spotId)

            const newState = {...state};
            newState.reviewsBySpotId[spotId] = state.reviewsBySpotId[spotId].filter(
                (ele) => ele.id !== action.reviewId
            )
            return newState
        default:
            return state
    }
}

export default reviewsReducer
