export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

// call this within SET_INTERVIEW and pass to it the temp state (eg. tempState = { ...state, appointments: action.value } )
export const calculateSpots = state => {
  // map through days
  const days = state.days.map(day => {
    // target selected day
    if (day.name === state.day) {
      // spots === all null interviews
      const spots = Object.values(day.appointments).filter(
        aptId => state.appointments[aptId].interview === null
      ).length;
      return { ...day, spots };
    }

    // otherwise return day if unselected
    return day;
  });
  // our days array we will inject into our new state
  return days;
};
// return 'days' to SET_INTERVIEW and return the new, updated state (eg. return { ...tempState, days } )

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };

    case SET_INTERVIEW:
      const tempState = { ...state, appointments: action.value };
      // pass temp state to spots fn()
      const days = calculateSpots(tempState);
      // new days + updated spots, easy peesy
      return { ...tempState, days };

    default:
      throw new Error(
        `Tried to reduce with an unsupported action type: ${action.type}`
      );
  }
}
