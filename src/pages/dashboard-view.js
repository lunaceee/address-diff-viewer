import React, { useState, useEffect } from "react";
import Addresses from "../components/Addresses";
import Events from "../components/Events";

const DashboardView = () => {
  const [events, setEvents] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    // populate user ids
    fetch("http://localhost:5000/user_ids")
      .then((res) => res.json())
      .then((response) => {
        setUserIds([...response]);
      })
      .catch((error) => console.error("Caught an error!", error));
  }, []);

  useEffect(() => {
    // show different addresses based on selected user id
    setEvents([]); //reset events
    setSelectedAddress(""); //reset selected address
    if (selectedUser === "") return;
    fetch(`http://localhost:5000/users/${selectedUser}/addresses`)
      .then((res) => res.json())
      .then((response) => {
        setAddresses(response);
      })
      .catch((error) => console.error("Caught an error!", error));
  }, [selectedUser]);

  useEffect(() => {
    // get events based on selected address
    if (selectedAddress === "") return;
    fetch(`http://localhost:5000/addresses/${selectedAddress}/events`)
      .then((res) => res.json())
      .then((response) => {
        setEvents(response);
      })
      .catch((error) => console.error("Caught an error!", error));
  }, [selectedAddress]);

  return (
    <div className="dashboard">
      <Addresses
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        userIds={userIds}
        addresses={addresses}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <Events setEvents={setEvents} events={events} />
    </div>
  );
};

export default DashboardView;
