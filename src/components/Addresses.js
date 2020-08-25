import React from "react";
import Address from "./Address";
import UserIdSelector from "./UserIdSelector";

const Addresses = (props) => {
  const {
    selectedAddress,
    setSelectedAddress,
    userIds,
    addresses,
    selectedUser,
    setSelectedUser,
  } = props;

  return (
    <div className="addresses">
      <UserIdSelector
        userIds={userIds}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {!addresses.length ? (
        <h3>No addresses found</h3>
      ) : (
        <div className="user__address-info">
          <h2>Address Information</h2>
          <ul>
            {addresses.map((address) => {
              return (
                <Address
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  address={address}
                  key={address.id}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Addresses;
