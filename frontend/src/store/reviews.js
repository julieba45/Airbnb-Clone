import { csrfFetch } from "./csrf";

//action types
const GET_REVIEWS = 'reviews/GET_ALL_REVIEWS';

//action creators
const getAllReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

//thunk action creators
export const fetchReviewsBySpotId = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    console.log('DA RESPONSE', data.Reviews)
    dispatch(getAllReviews(data.Reviews))
}

const initialState = {
    reviewsBySpotId: {}
}
const reviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEWS:
            console.log('HEY IM IN THE GETREVIEWS CASE')
            console.log('ACTION', action)
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
        default:
            return state
    }
}

export default reviewsReducer
