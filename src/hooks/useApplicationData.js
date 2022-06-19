import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log("this is all", all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let days = state.days
    if (!state.appointments[id].interview) {
      days = state.days.map((day) => {
        const updatedDay = { ...day };
        if (updatedDay.appointments.includes(id)) {
          updatedDay.spots--;
          return updatedDay
        } else {
          return updatedDay
        };
      });
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    const days = state.days.map((day) => {
      const updatedDay = { ...day };
      if (updatedDay.appointments.includes(id)) {
        updatedDay.spots++;
        return updatedDay
      } else {
        return updatedDay
      };
    });

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview, setState  };
}
