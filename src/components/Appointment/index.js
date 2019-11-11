import React from "react";
import "components/Appointment/styles.scss";

import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // SETTING INITAL MODE (EITHER SHOW OR EMPTY) AND EXTRACTING OUT FUNCTIONS
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // SAVING INTERVIEW
  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    // Sending info to Application and handling response accordingly
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  // EDIT INTERVIEW
  const edit = () => {
    transition(EDIT);
  };

  // CONFIRM DELETE INTERVIEW
  const confirmDelete = () => {
    transition(CONFIRM);
  };

  // CANCELLING INTERVIEW
  const cancel = () => {
    transition(DELETING, true); // WHY IS THE BOOLEAN ARGUMENT FOR THIS ONE NECESSARY??????
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true)); // WHEN THIS ONE HANDLES IT REGARDLESS
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {/* Empty the card and display an on-click plus image (CREATE)*/}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {/* Show the card with the set student and interviewer names from props */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={cancel}
          onCancel={() => back()}
          message={"Are you sure you would like to Delete?"}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete appointment"}
          onClose={() => back()}
        />
      )}
      
    </article>
  );
}
