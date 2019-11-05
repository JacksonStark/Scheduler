/* eslint-disable no-undef */


describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/")
    cy.contains("Monday")
  })

  it("should book an interview", () => {
    // click "add" button
    cy.get("[alt=add]")
      .first()
      .click();
    // enter name into input
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    // select interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    // click the save button
    cy.contains("Save")
      .click();
    // confirm the appointment is in SHOW mode (student & int)
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })
  
  
  it("should edit an interview", () => {
    // click the "edit" button
    cy.get("[alt=Edit]")
      .first()
      .click({force: true})
    // enter name into input
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Jackson Stark");
    // select interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();
    // click the save button
    cy.contains("Save")
      .click();
    // confirm the appointment is in SHOW mode (student & int)
    cy.contains(".appointment__card--show", "Jackson Stark");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    // click the "delete" button
    cy.get("[alt=Delete]")
      .first()
      .click({force: true})
    // click the "confirm" button
    cy.contains("Confirm")
      .click();
    // confirm appointment is "Deleting"
    cy.contains("Deleting")
      .should("exist")
    // confirm "Deleting" status is gone
    cy.contains("Deleting")
      .should("not.exist")
    // confirm appointment card is empty
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist")

  })
})