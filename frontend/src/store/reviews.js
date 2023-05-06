import { csrfFetch } from "./csrf";

//action types
const GET_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'

//action creators
const getAllReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

//thunk action creators
export const fetchReviewsBySpotId = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    // console.log('DA RESPONSE', data.Reviews)
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
        dispatch(createReview(newreview))
        return newreview
    }else {
        console.log('------------RESPONSE IS NOT OK')
        if(response.status === 403){
            throw { message: "User already has a review for this spot" };
        } else {
            throw { message: "The provided review data was invalid" };
        }

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
            // console.log('ACTION', action)
            // const reviewsById = {}
            // action.reviews.forEach(review => {
            //     reviewsById[review.id] = review;
            // });
            return {
                ...state,
                reviewsBySpotId: {
                    ...state.reviewsBySpotId,
                    [action.reviews[0].spotId]: action.reviews,
                }

            }
        case CREATE_REVIEW:
            console.log('HEY IM IN THE CREATEREVIEW CASE')
            console.log('ACTION', action)
            return{
                ...state,
                reviewsBySpotId: {
                    ...state.reviewsBySpotId,
                }
            }
        default:
            return state
    }
}

export default reviewsReducer
