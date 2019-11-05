import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application";

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
        })
    )
  };



  return {state, setDay, bookInterview, cancelInterview}
}









