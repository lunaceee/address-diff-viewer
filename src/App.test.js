import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Addresses from "./components/Addresses";
import Events from "./components/Events";

afterEach(cleanup);

let mockSetterFunction = () => {};

let events = [
  {
    type: "ADDRESS_CREATED",
    payload: {
      id: "11de72d0-1f95-11e9-9a66-219542f4f9e9",
      user_id: "44fe83d5-a6be-4b2d-934f-1c13796bb569",
      street_one: "123 Main Street",
      city: "San Francisco",
      state_id: "CA",
      zip_code: "94109",
    },
    created_at: "2019-01-24T05:01:12.236Z",
    url: "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306072236",
  },
  {
    type: "ADDRESS_UPDATED",
    payload: {
      zip_code: "94111",
    },
    created_at: "2019-01-24T05:05:49.771Z",
    url: "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306349771",
  },
  {
    type: "ADDRESS_DELETED",
    payload: {
      deleted_at: "2019-01-24T05:08:50.470Z",
    },
    created_at: "2019-01-24T05:08:50.505Z",
    url: "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306530505",
  },
  {
    type: "ADDRESS_RESTORED",
    payload: {
      restored_at: "2019-01-24T05:09:00.050Z",
    },
    created_at: "2019-01-24T05:09:00.059Z",
    url: "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306540059",
  },
];

let addresses = [
  {
    id: "11de72d0-1f95-11e9-9a66-219542f4f9e9",
    user_id: "44fe83d5-a6be-4b2d-934f-1c13796bb569",
    street_one: "123 Main Street",
    street_two: null,
    city: "San Francisco",
    state: "CA",
    zip_code: "94109",
    country: "US",
    created_at: "2019-01-24T05:01:12.191Z",
    updated_at: "2019-01-24T05:01:12.191Z",
    deleted_at: null,
  },
  {
    id: "1c190260-1f95-11e9-9a66-219542f4f9e9",
    user_id: "44fe83d5-a6be-4b2d-934f-1c13796bb569",
    street_one: "234 Elm Street",
    street_two: null,
    city: "Oakland",
    state: "CA",
    zip_code: "94618",
    country: "US",
    created_at: "2019-01-24T05:01:29.351Z",
    updated_at: "2019-01-24T05:01:29.351Z",
    deleted_at: null,
  },
];

let userIds = [
  "940b10a8-98ef-4655-99a8-4757b60ea121",
  "794017e2-568e-46d6-be95-3d1894198433",
];

let selectedAddress = "727c5c30-e828-11ea-a06b-3f19dca86e04";
let selectedUser = "940b10a8-98ef-4655-99a8-4757b60ea121";

test("renders no addresses and empty state", () => {
  const { getByText } = render(
    <Addresses
      selectedAddress={""}
      setSelectedAddress={mockSetterFunction}
      userIds={[]}
      addresses={[]}
      selectedUser={""}
      setSelectedUser={mockSetterFunction}
    />
  );
  const message = getByText(/No addresses found/i);
  expect(message).toBeInTheDocument();
});

test("renders addresses", () => {
  const { getByText } = render(
    <Addresses
      selectedAddress={selectedAddress}
      setSelectedAddress={mockSetterFunction}
      userIds={userIds}
      addresses={addresses}
      selectedUser={selectedUser}
      setSelectedUser={mockSetterFunction}
    />
  );
  const message = getByText(/Address Information/i);
  expect(message).toBeInTheDocument();
});

test("renders no events and the empty state", () => {
  const { getByText } = render(<Events events={[]} />);
  const message = getByText(/No events found/i);
  expect(message).toBeInTheDocument();
});

test("renders events with one event", () => {
  const { getByText } = render(<Events events={[events[0]]} />);
  const message = getByText(
    /The address hasn't been updated since first created. Nothing to compare./i
  );
  expect(message).toBeInTheDocument();
});

test("renders events with multiple events", () => {
  const { getAllByText } = render(<Events events={events} />);
  const result = getAllByText(/ADDRESS_/i);
  expect(result).toHaveLength(4);
});

test("renders a compare button disabled", () => {
  const { getByText } = render(<Events events={events} />);
  const button = getByText(/Compare/i);
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("disabled");
});

test("renders a compare button enabled", () => {
  const { getByText, getByLabelText } = render(<Events events={events} />);
  const button = getByText(/Compare/i);
  expect(button).toBeInTheDocument();
  const checkBox1 = getByLabelText(/ADDRESS_CREATED/i);
  const checkBox2 = getByLabelText(/ADDRESS_UPDATED/i);
  expect(button.disabled).toBeTruthy();
  fireEvent.click(checkBox1);
  fireEvent.click(checkBox2);
  expect(button.disabled).toBeFalsy();
});
