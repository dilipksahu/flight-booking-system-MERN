import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  GET_SECRET,
  SEARCH_FLIGHT,
  FLIGHT_ERROR,
  BOOK_FLIGHT,
  CLEAR_FLIGHT,
  FETCH_USER_DETAILS,
  USER_DETAILS_ERROR,
  FLIGHT_BOOK,
  STORE_USER_DETAILS,
  CLEAR_BOOKING,
  GET_BOOKINGS,
  CANCEL_BOOKING,
  CLEAR_FLIGHT_ERROR,
  FLIGHT_HOLD,
  STORE_FLIGHT_FARE,
} from "./types";

// const SERVER_URL = 'https://online-flight-book-system.herokuapp.com/';
const SERVER_URL = 'http://localhost:3000/';
const BASE_URL = SERVER_URL;

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    console.log(data);
    const res = await axios.post(BASE_URL + "google", {
      access_token: data,
    });
    console.log(res);
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data,
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    const authHeader = "Bearer " + res.data.token;
    axios.defaults.headers.common["Authorization"] = authHeader;
  };
};

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    console.log(data);
    const res = await axios.post(BASE_URL + "facebook", {
      access_token: data,
    });
    console.log(res.data.newUser.userDetails);
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data,
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    const authHeader = "Bearer " + res.data.token;
    axios.defaults.headers.common["Authorization"] = authHeader;
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const user = {
        email: data.email,
        password: data.password1,
      };
      const res = await axios.post(BASE_URL + "signup", user);
      console.log(res);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      const authHeader = "Bearer " + res.data.token;
      axios.defaults.headers.common["Authorization"] = authHeader;
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use",
      });
      console.log(error);
    }
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(BASE_URL + "signin", data);
      console.log(res);
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      const authHeader = "Bearer " + res.data.token;
      axios.defaults.headers.common["Authorization"] = authHeader;
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email or password isn't correct",
      });
      console.log(error);
    }
  };
};

export const validateSignUp = (data) => {
  return (dispatch) => {
    if (data.email && data.password1 && data.password2) {
      if (data.password1 !== data.password2) {
        dispatch({
          type: AUTH_ERROR,
          payload: "Passwords don't match",
        });
        return false;
      } else return true;
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: "All fields are required",
      });
      return false;
    }
  };
};
export const validateSearch = (data) => {
  return (dispatch) => {
    if (data.from && data.to && data.date) {
      if (data.from === data.to) {
        dispatch({
          type: FLIGHT_ERROR,
          payload: "Source and destination cannot be same",
        });
        return false;
      } else {
        console.log(Date.now());
        let date = new Date();
        if (Date.parse(data.date) < date.setDate(date.getDate() - 1)) {
          dispatch({
            type: FLIGHT_ERROR,
            payload: "Past date is not allowed",
          });
          return false;
        } else return true;
      }
    } else {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "All fields are required",
      });
      return false;
    }
  };
};

export const validateUserDetails = (data) => {
  return (dispatch) => {
    if (data.firstName && data.lastName && data.birthdate) {
      if (Date.parse(data.birthdate) > Date.now()) {
        dispatch({
          type: USER_DETAILS_ERROR,
          payload: "Future date is not allowed",
        });
        return false;
      } else return true;
    } else {
      dispatch({
        type: USER_DETAILS_ERROR,
        payload: "All fields are required",
      });
      return false;
    }
  };
};
export const validateSignIn = (data) => {
  return (dispatch) => {
    if (data.email && data.password) {
      return true;
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: "All fields are required",
      });
      return false;
    }
  };
};

export const storeFlight = (flightId) => {
  console.log(flightId);
  return async (dispatch) => {
    try {
      const res = await axios.get(BASE_URL + "flights/" + flightId);
      console.log(res.data);
      const flight = res.data;
      dispatch({
        type: BOOK_FLIGHT,
        payload: flight,
      });
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "No flight found for given id",
      });
      console.log(error);
    }
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(BASE_URL + "secret");
      console.log(res);
      dispatch({
        type: GET_SECRET,
        payload: res.data.secret,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: {},
    });
    dispatch({
      type: CLEAR_FLIGHT,
    });
  };
};

export const storeUserDetails = (data) => {
  return (dispatch) => {
    console.log(data);
    dispatch({
      type: STORE_USER_DETAILS,
      payload: data,
    });
  };
};

export const clearBooking = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_BOOKING,
      payload: {},
    });
  };
};

export const cancelBooking = (bookingId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        BASE_URL + "bookings/" + bookingId
      );
      console.log(res.data.success);
      dispatch({
        type: CANCEL_BOOKING,
        payload: res.data.success,
      });
      // return res.data;
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "Could not cancel booking",
      });
      console.log(error);
    }
  };
};

export const searchFlight = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        BASE_URL + "flights/search",
        data
      );
      console.log(res.data);
      if (res.data.length > 0) {
        dispatch({
          type: SEARCH_FLIGHT,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_FLIGHT_ERROR,
          payload: "",
        });
      } else {
        dispatch({
          type: FLIGHT_ERROR,
          payload: "Could not get any flights",
        });
      }
      // return res.data;
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "Could not connect",
      });
      console.log(error);
    }
  };
};

export const addUserDetails = (userId, formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        BASE_URL + "users/" + userId,
        formData
      );
      console.log(res.data);
      // return res.data;
    } catch (error) {
      dispatch({
        type: USER_DETAILS_ERROR,
        payload: "Adding passenger failed",
      });
      console.log(error);
    }
  };
};

export const fetchUserDetails = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(BASE_URL + "users/" + userId);
      console.log(res.data);

      dispatch({
        type: FETCH_USER_DETAILS,
        payload: res.data,
      });
      // return res.data;
    } catch (error) {
      dispatch({
        type: USER_DETAILS_ERROR,
        payload: "Could not get passenger details",
      });
      console.log(error);
    }
  };
};

export const getBookings = (userDetailId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        BASE_URL + "bookings/userDetails/" + userDetailId
      );
      console.log(res.data);
      dispatch({
        type: GET_BOOKINGS,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "Could not get booking details",
      });
      console.log(error);
    }
  };
};

export const bookFlight = (user, flight) => {
  return async (dispatch) => {
    try {
      console.log(user, flight);
      const res = await axios.post(BASE_URL + "bookings", {
        user,
        flight,
      });
      dispatch({
        type: FLIGHT_BOOK,
        payload: res.data,
      });
      console.log(res.data);
      // return res.data;
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "Booking failed",
      });
      console.log(error);
    }
  };
}; 

export const holdFlight = (user, flight, holdingStatus) => {
  return async (dispatch) => {
    try {
      console.log(user, flight, holdingStatus);
      const res = await axios.post(BASE_URL + "bookings", {
        user,
        flight,
        holdingStatus,
      });
      dispatch({
        type: FLIGHT_BOOK,
        payload: res.data,
      });
      console.log(res.data);
      // return res.data;
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "holding failed",
      });
      console.log(error);
    }
  };
};
export const userHoldFlight = (user, flight, holdingStatus) => {
  return async (dispatch) => {
    try {
      console.log(user, flight, holdingStatus);
      const res = await axios.post(BASE_URL + "bookings/userwiseHolding", {
        user,
        flight,
        holdingStatus,
      });
      dispatch({
        type: FLIGHT_HOLD,
        payload: res.data,
      });
      console.log(res.data);
      // return res.data;
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "holding failed",
      });
      console.log(error);
    }
  };
};
export const storeFlightFare = (data) => {
  return (dispatch) => {
    console.log(data);
    dispatch({
      type: STORE_FLIGHT_FARE,
      payload: data,
    });
  };
};
