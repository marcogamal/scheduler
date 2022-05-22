import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames({interviewerClass: true,
    "interviewers__item": true, 
    "interviewers__item--selected": props.selected,
  });
  return (
    <li
      className={interviewerClass}
      key={props.id}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
