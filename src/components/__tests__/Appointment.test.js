// Allows us to use React.createElement
import React from "react";

// Allows us to render components and have cleanup afterwards
import { render, cleanup } from "@testing-library/react";

// Allows us to use the component we are testing
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
