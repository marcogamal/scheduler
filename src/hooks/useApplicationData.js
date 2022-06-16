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
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
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
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments,
        });
      });
  }
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments }));
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

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
