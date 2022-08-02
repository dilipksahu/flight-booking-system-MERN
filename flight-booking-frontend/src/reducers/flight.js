import {
  SEARCH_FLIGHT,
  FLIGHT_ERROR,
  BOOK_FLIGHT,
  CLEAR_FLIGHT,
  FLIGHT_BOOK,
  STORE_USER_DETAILS,
  CLEAR_BOOKING,
  GET_BOOKINGS,
  CANCEL_BOOKING,
  CLEAR_FLIGHT_ERROR,
  FLIGHT_HOLD,
  STORE_FLIGHT_FARE,
} from "../actions/types";

const DEFAULT_STATE = {
  flights: [],
  flight: {},
  booking: {},
  bookings: [],
  userDetails: {},
  cancelBooking: false,
  errorMessage: "",
  holding: [],
  holdFare: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_FLIGHT:
      return {
        ...state,
        flights: action.payload,
      };
    case BOOK_FLIGHT:
      return {
        ...state,
        flight: action.payload,
      };
    case FLIGHT_BOOK:
      return {
        ...state,
        flights: [],
        booking: action.payload,
      };
    case FLIGHT_HOLD:
      return {
        ...state,
        flights: [],
        holding: action.payload,
      };
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };
    case CLEAR_BOOKING:
      return {
        ...state,
        cancelBooking: false,
        booking: action.payload,
      };
    case CLEAR_FLIGHT_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CANCEL_BOOKING:
      return {
        ...state,
        cancelBooking: true,
      };
    case STORE_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload, 
      };
    case STORE_FLIGHT_FARE:
      return {
        ...state,
        holdFare: action.payload,
      };
    case CLEAR_FLIGHT:
      return {
        ...state,
        flights: [],
        flightId: {},
        booking: {},
        userDetails: {},
        holding: [],
      };
    case FLIGHT_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
