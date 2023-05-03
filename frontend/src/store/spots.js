import { csrfFetch } from "./csrf";


// action types
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_DETAILS_SPOT = 'spots/GET_DETAILS_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
// const DELETE_SPOT = 'spots/DELETE_SPOT';

//action creators
const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
});

const setCurrentSpot = (spot) => ({
  type: GET_DETAILS_SPOT,
  spot
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
});
// const updateSpot = (spot) => ({ type: UPDATE_SPOT, spot });
// const deleteSpot = (spotId) => ({ type: DELETE_SPOT, spotId });

// thunk action creators
export const fetchAllSpots = () => async (dispatch) => {
    // fetch spots from the backend
    // const {page, size} = filterallSpots;
    // const queryString = new URLSearchParams({
    //     page,
    //     size
    // }).toString();
    const response = await fetch(`/api/spots`)
    const spots = await response.json();
    // console.log('SPOTS RESPONSE',spots)
    dispatch(getAllSpots(spots))


  };

  export const fetchSpot = (id) => async (dispatch) => {
    // fetch a single spot by ID from the backend
    const response = await csrfFetch(`/api/spots/${id}`)
    // console.log('---SPOTS ID RESPONSE----',response)
    if(response.ok){
      const spot = await response.json();
      console.log('SPOT DETAILS:',spot)
      dispatch(setCurrentSpot(spot))
    }
  };

  export const addSpot = (spot) => async (dispatch) => {
    // add a spot to the backend
    console.log('INSIDE OF ADDSPOT')
    const response = await fetch(`/api/spots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    })
     console.log('CREATE SPOT RESPONSE',response)
    if(response.ok){

      const newspot = await response.json();
      console.log("---------Response SPOT", newspot)
      dispatch(createSpot(newspot))
      return newspot
    }
  };

  export const editSpot = (spot) => async (dispatch) => {
    // update a spot in the backend
  };

  export const removeSpot = (id) => async (dispatch) => {
    // remove a spot from the backend
  };


  const initialState = {
    spots: {},
    currentSpot: null,
  };

  //Helper function
  const handleGetAllSpots = (state, action) => {
    const spots = {};

    action.spots.Spots.forEach(spot => {
      spots[spot.id] = spot;
    });

    return {
      ...state,
      spots,
      pagination: {
        page: action.spots.page,
        size: action.spots.size,
      },
    };
  };


  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_SPOTS:
        // handle getting all spots
        // console.log('IN THE CASE')
        return handleGetAllSpots(state, action)
        // return { ...state, spots: action.spots };
      case GET_DETAILS_SPOT:
        // handle getting a single spot
      console.log('GET DETAILS SPOT: ',{...state, currentSpot: action.spot})
        return { ...state, currentSpot: action.spot };
      case CREATE_SPOT:
        // console.log('IM IN CREATESPOT CASE')
        // handle creating a spot
        return {
          ...state,
          spots: { ...state.spots, [action.spot.id]: action.spot },
          currentSpot: action.spot,
         };
      case UPDATE_SPOT:
        // handle updating a spot
        return { ...state, spots: { ...state.spots, [action.spot.id]: action.spot } };
      // case DELETE_SPOT:
        // handle deleting a spot
        // const newState = { ...state };
        // delete newState.spots[action.spotId];
        // return newState;
      default:
        return state;
    }
  };


export default spotsReducer;
