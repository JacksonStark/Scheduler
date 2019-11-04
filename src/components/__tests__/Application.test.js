import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  // queryByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  xit("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // click the add icon
    fireEvent.click(getByAltText(appointment, "add"))
    
    // enter name into input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jackson Stark" }
    })

    // select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    // save interview
    fireEvent.click(getByText(appointment, "Save"))

    // expect interview to be saving
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // wait for appointment card to update
    await waitForElement(() => getByText(appointment, "Jackson Stark"))

    console.log(prettyDOM(appointment));
  });

});
