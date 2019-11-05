import React from "react";
import "components/Appointment/styles.scss";

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment_add-button"
        src="images/add.png"
        alt="add"
        onClick={props.onAdd}
      />
    </main>
  );
}
