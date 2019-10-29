import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment/index.js";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
  },
  {
    id: 4,
    time: "6pm",
  },
  {
    id: 5,
    time: "9pm",
    interview: {
      student: "Jackson Stark",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];

export default function Application(props) {
  const [ day, setDay ] = useState("Monday");
  const [ days, setDays ] = useState([]);

  useEffect(() => {

    axios.get(`/api/days`)
      .then((response) => {
        console.log(response.data)
        setDays(response.data)
      })

  }, [])

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
            days={days}
            day={day}
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
        {appointments.map(appointment => {
          return (
            <Appointment key={appointment.id} {...appointment}/>
          )
        })}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
    
  );
}
