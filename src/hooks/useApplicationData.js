import { useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const UPDATE_SPOTS = "UPDATE_SPOTS";


const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.value}

    case SET_APPLICATION_DATA:
      return {...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers}
      
    case SET_INTERVIEW:
      return {...state, appointments: action.value}

    case UPDATE_SPOTS:
      return {...state, days: action.value}

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const initialSchedule = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
}

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, initialSchedule)

  const setDay = day => dispatch({type: SET_DAY, value: day});
  // FETCH ALL DATA FROM API
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then((all) => {
      const promiseData = {days: all[0].data, appointments: all[1].data, interviewers: all[2].data}
      dispatch({type: SET_APPLICATION_DATA, value: promiseData})
    })
  }, [])
  
  
  const updateSpots = (newBooking) => {
    let days = state.days.map(day => {
      
      if (day.name === state.day) {
        if (newBooking) {
          // Removing Spot
          return {...day, spots: day.spots - day.spots > 0 ? 1 : 0}
        } else {
          // Adding Spot
          return {...day, spots: day.spots + 1}
        }
      }
      
      return day
    })
    dispatch({type: UPDATE_SPOTS, value: days})
  }

  // BOOKING INTERVIEW
  const bookInterview = (id, interview) => {

    // COPYING EXISTING APPOINTMENT AND INCLUDE THE NEW BOOKING
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    // COPYING EXISTING APPOINTMENTS AND INCLUDE THE UPDATED APPOINTMENT
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // REASSIGNING/SETTING STATE FOR NEW APPOINTMENTS OBJECT
    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((response) => {
          // console.log(appointments)
          dispatch({type: SET_INTERVIEW, value: appointments})
          updateSpots(true);
        })
    )
  }

  // CANCELLING INTERVIEW
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return(
      axios.delete(`api/appointments/${id}`)
        .then((response) => {
          dispatch({type: SET_INTERVIEW, value: appointments})
          updateSpots(false);
        })
    )
  };



  return {state, setDay, bookInterview, cancelInterview}
}









