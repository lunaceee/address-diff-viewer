import React, { Fragment } from "react";

const Address = (props) => {
  const { address, setSelectedAddress, selectedAddress } = props;

  const keys = Object.keys(address);
  let handleSelectAddress = (e) => {
    const selectedAddressId = e.target.closest("li").id;
    setSelectedAddress(selectedAddressId);
  };

  return (
    <li
      className="address"
      data-selected={address.id === selectedAddress}
      id={address.id}
      onClick={handleSelectAddress}
    >
      <dl>
        {keys.map((k) => {
          return (
            <Fragment key={k}>
              <dt>{k}:</dt>
              <dd>&nbsp;{address[k]}</dd>
            </Fragment>
          );
        })}
      </dl>
    </li>
  );
};

export default Address;
