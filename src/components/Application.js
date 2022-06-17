import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // function save(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer,
  //   };

  //   transition(SAVING);

  //   props
  //     .bookInterview(props.id, interview)
  //     .then(() => transition(SHOW))
  //     .catch(error => transition(ERROR_SAVE, true));
  // }

  // function cancel(id) {
  //   transition(DELETE);

  //   props.cancelInterview(props.id).then(() => {
  //     transition(EMPTY);
  //   });
  //   .catch(error => transition(ERROR_SAVE, true));
  // }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  let spots = 0;

  const eachAppointment = dailyAppointments.map((item) => {
    const interview = getInterview(state, item.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    if (item.interview === null) {
      spots += 1;
    }

    return (
      <Appointment
        key={item.id}
        {...item}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} spotsCount={state.spots}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {eachAppointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
