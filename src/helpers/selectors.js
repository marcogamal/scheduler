export function getAppointmentsForDay(state, day) {
  let result = [];
  const allowed = state.days.filter(eachDay => eachDay.name === day);

  for (let i of allowed) {
    for (let j = 0; j < i.appointments.length; j++) {
      let vv = i.appointments[j];
      if (state.appointments[vv]) {
        result.push(state.appointments[vv]);
      }
    }
  }
  console.log("result: ", result);
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewComponent = { 
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }
  return interviewComponent;
} 

export function getInterviewersForDay (state, day) {
  let result = [];
  const allowed = state.days.filter(eachDay => eachDay.name === day);

  for (let i of allowed) {
    for (let j = 0; j < i.interviewers.length; j++) {
      let vv = i.interviewers[j];
      if (state.interviewers[vv]) {
        result.push(state.interviewers[vv]);
      }
    }
  }
  console.log("result: ", result);
  return result;
}