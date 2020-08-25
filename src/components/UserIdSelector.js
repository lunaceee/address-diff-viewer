import React from "react";

const UserIdSelector = ({ selectedUser, setSelectedUser, userIds }) => {
  let handleSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  let message =
    userIds.length === 0
      ? "Connecting to the server..."
      : "-- Please select a user --";

  return (
    <div className="user--select">
      <label htmlFor="user-select">
        <span>Select user by ID: </span>
      </label>
      <select
        disabled={userIds.length === 0}
        id="user-select"
        defaultValue={selectedUser}
        onChange={handleSelect}
        className="select-widget"
      >
        <option value="" disabled={selectedUser !== ""}>
          {message}
        </option>
        {userIds.map((userId) => {
          return <option key={userId}>{userId}</option>;
        })}
      </select>
    </div>
  );
};

export default UserIdSelector;
