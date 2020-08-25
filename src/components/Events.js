import React, { useState, useEffect } from "react";
import Event from "./Event";
import { useHistory } from "react-router-dom";

const Events = ({ events }) => {
  const [checkedEvents, setCheckedEvents] = useState([]);

  useEffect(() => {
    //clear checkedEvents everytime the events change
    setCheckedEvents([]);
  }, [events]);

  let handleChange = (e) => {
    const index = parseInt(e.target.value);
    if (checkedEvents.indexOf(index) !== -1) {
      // remove the item when we uncheck the checkbox
      let copyOf = [...checkedEvents];
      copyOf.splice(copyOf.indexOf(index), 1);
      setCheckedEvents(copyOf);
    } else {
      // when there's nothing checked, add items to checkedEvents, compare button disabled
      setCheckedEvents([...checkedEvents, index]);
    }
  };
  const history = useHistory();

  let handleChangeRoute = (e) => {
    e.preventDefault();

    //make sure the most updated event always show up at the
    //right hand side despite the order of selection
    const copyOf = [...checkedEvents].sort();
    let url1 = encodeURIComponent(events[copyOf[0]].url);
    let url2 = encodeURIComponent(events[copyOf[1]].url);

    history.push(`/diff/${url1}/${url2}`);
  };

  return (
    <div className="events">
      <h2>Events</h2>
      {!events.length ? (
        <h3>No events found</h3>
      ) : (
        <form>
          <button
            disabled={checkedEvents.length !== 2}
            onClick={handleChangeRoute}
          >
            Compare
          </button>
          {events.length < 2 && (
            <div className="isa-info">
              <i className="fa fa-info-circle"></i>
              The address hasn't been updated since first created. Nothing to
              compare.
            </div>
          )}
          <ul>
            {events.map((event, index) => {
              return (
                <Event
                  key={index}
                  index={index}
                  event={event}
                  value={index}
                  checked={checkedEvents.includes(index)}
                  onChange={handleChange}
                  disabled={
                    checkedEvents.length === 2 && !checkedEvents.includes(index)
                  }
                />
              );
            })}
          </ul>
        </form>
      )}
    </div>
  );
};

export default Events;
