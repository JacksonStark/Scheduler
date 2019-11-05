import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByTestId,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {


  // DEFAULT TO MONDAY AND SCHEDULE CHANGE TEST

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  // LOAD DATA, BOOK INTERVIEW & REDUCE SPOTS TEST

  it("loads data, books an interview and reduces the spots remaining for the Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 1. Click the "add" button, since its in EMPTY mode
    fireEvent.click(getByAltText(appointment, "add"));
    
    // 2. Enter name into input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jackson Stark" }
    })

    // 3. Select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 4. Save interview
    fireEvent.click(getByText(appointment, "Save"));

    // 5. Check interview is saving
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // 6. Wait for appointment card to update to SHOW mode
    await waitForElement(() => getByText(appointment, "Jackson Stark"));

    // 7. Check edit icon is now visible
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();

    // 8. Target monday's node
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    // 9. Check monday has 0 spots
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });


  //  LOAD DATA, CANCEL INTERVIEW & INCREASE SPOTS TEST

  it("loads data, cancels an interview, and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => 
      queryByText(appointment, "Archie Cohen")
    );
    
    // 1. Click the "delete" button
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 2. Check that confirmation message is displayed
    expect(getByText(appointment, 
      "Are you sure you would like to Delete?")).toBeInTheDocument();

    // 3. Click the "confirm" button
    fireEvent.click(getByText(appointment, "Confirm"));

    // 4. Check that interview is deleting
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // 5. Wait for appointment to update to EMPTY mode
    await waitForElement(() => getByAltText(appointment, "add"));
    
    // 6. Check "add" icon is now visible
    expect(getByAltText(appointment, "add")).toBeInTheDocument();

    // 7. Target monday's node
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    // 8. Check monday has 2 spots
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  })


  //  LOAD DATA, EDIT INTERVIEW & KEEP SPOTS SAME TEST

  it("loads data, edits an interview, and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => 
      queryByText(appointment, "Archie Cohen")
    );
    
    // 1. Click the "edit" button, since it is in SHOW mode
    fireEvent.click(getByAltText(appointment, "Edit"));
    
    // 2. Confirm that edit form appears
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();
    
    // 3. Change/enter new input name
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Will Smith" }
    })

    // 4. Select different interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "save" button
    fireEvent.click(getByText(appointment, "Save"))

    // 7. Check that "saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    // 8. Wait for the appointment to update to SHOW mode
    await waitForElement(() => getByText(appointment, "Will Smith"))

    // 9. Check that the edit icon is now visible
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();

    // 7. Target monday's node
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    // 8. Check monday still has 1 spot
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })


  // DISPLAY SAVE ERROR WHEN SAVE APPOINTMENT FAILS TEST

  it ("shows the save error when failing to save an appointment", async () => {
    // mock function for error
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // 1. Click the "add" button, since its in EMPTY mode
    fireEvent.click(getByAltText(appointment, "add"));
    
    // 2. Enter name into input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jackson Stark" }
    })
    
    // 3. Select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 4. Save interview
    fireEvent.click(getByText(appointment, "Save"))

    // 5. Wait for appointment to update to ERROR_SAVE mode
    await waitForElement(() => getByText(appointment, "Error"));

    // 6. Check that the save error message is shown
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
  })


  // DISPLAY DELETE ERROR WHEN DELETE APPOINTMENT FAILS TEST

  it ("shows the delete error when failing to delete an appointment", async () => {
    // mock function for error
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => 
      queryByText(appointment, "Archie Cohen")
    );
    // 1. Click the "delete" button
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 2. Click the "confirm" button
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 3. Wait for appointment to update to ERROR_DELETE mode
    await waitForElement(() => getByText(appointment, "Error"));
    
    // 4. Check that delete error message is shown
    expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
  })


});
