export function getAppointmentsForDay(state, day) {
  let days = state.days
  let appointments = [];
  for (const currentDay of days) {
    if (currentDay.name === day) { 
      currentDay.appointments.forEach(appId => {
        appointments.push(state.appointments[appId]);
      })
    }
  }
  return appointments;
}

export function getInterviewersForDay(state, day) {
  let days = state.days
  let interviewers = [];
  for (const currentDay of days) {
    if (currentDay.name === day) { 
      currentDay.interviewers.forEach(intId => {
        interviewers.push(state.interviewers[intId]);
      })
    }
  }
  return interviewers;
}

export function getInterview(state, interview) {
  let interviewerObj;
  let interviewers = state.interviewers
  if (interview === null) {
    return null
  }

  for (const interviewerId in interviewers) {

    if (Number(interviewerId) === interview.interviewer) {
      interviewerObj = state.interviewers[interviewerId];
    }
  }

  const interviewObj = {
    student: interview.student,
    interviewer: interviewerObj
  }
  return interviewObj;
};
