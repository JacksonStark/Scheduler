// import React, { useState, useEffect } from "react";
import React from "react";
import "components/Application.scss";

import DayList from 'components/DayList';
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  // console.log(state.appointments)
  
  // SETTING SCHEDULE (based on day)
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment 
          key={appointment.id}
          {...appointment}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview = {cancelInterview}
        />
      );
    }
    );



  return (
    <main className="layout">

    {/* Sidebar structure */}
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler" 
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    
  );
}
