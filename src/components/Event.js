import React from "react";

const Event = (props) => {
  const { event, onChange, index, disabled, checked } = props;
  const timeStamp = event.created_at;

  return (
    <li key={index} className="event-list-item">
      <span>
        <input
          id={event.url}
          value={index}
          name="event-checkbox"
          type="checkbox"
          onChange={onChange}
          disabled={disabled}
          checked={checked}
        />
        <label htmlFor={event.url}>{event.type}</label>
      </span>
      <span className="event-time-stamp">{timeStamp}</span>
    </li>
  );
};

export default Event;
