/// <reference types="cypress" />

describe("Test Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should contain Contacts header", () => {
    cy.contains("Contacts").should("be.visible");
  });

  it("should show the contacts table", () => {
    cy.get(".contact-table").should("be.visible");
  });

  it("should show the table header titles", () => {
    cy.get("thead > :nth-child(1)").should("be.visible");
    cy.get(".table-name").should("be.visible");
    cy.get(".table-address").should("be.visible");
    cy.get(".table-age").should("be.visible");
    cy.get(".table-controls").should("be.visible");
  });

  it("should wait for the data to be loaded", () => {
    const url = "http://localhost:5020/form";

    cy.intercept("GET", url).as("fetchData");

    cy.wait("@fetchData");

    cy.get("tbody > :nth-child(1) > :nth-child(2)").should(
      "contain.text",
      "johnee"
    );
  });

  it("first row data should have edit button", () => {
    cy.get(":nth-child(1) > :nth-child(5) > .btn").should("exist");
  });

  it("first row data should have delete button", () => {
    cy.get(":nth-child(1) > :nth-child(6) > .btn").should("exist");
  });

  it("should show contact form after edit button clicked", () => {
    cy.get(":nth-child(1) > :nth-child(5) > .btn").should("exist");
    cy.get('[data-test="test-name"]').should("not.exist");

    cy.get(":nth-child(1) > :nth-child(5) > .btn").click();

    cy.get('[data-test="test-name"]').should("exist");
    cy.get('[data-test="test-address"]').should("exist");
    cy.get('[data-test="test-age"]').should("exist");
    cy.get('[data-test="submit-button"]').should("exist");
    cy.get('[data-test="cancel-button"]').should("exist");
  });

  it("should close the contact form after cancel button is clicked", () => {
    cy.get(":nth-child(1) > :nth-child(5) > .btn").should("exist");
    cy.get(":nth-child(1) > :nth-child(5) > .btn").click();
    cy.get('[data-test="cancel-button"]').should("exist");
    cy.get('[data-test="cancel-button"]').click();
    cy.get('[data-test="test-name"]').should("not.exist");
  });

  it("should create a new contact, edit and then delete it", () => {
    cy.get('[data-test="create-contact-button"]').should("exist");
    cy.get('[data-test="create-contact-button"]').should("be.visible");
    cy.get('[data-test="create-contact-button"]').click();

    cy.get('[data-test="submit-button"]').should("exist");

    cy.get('[data-test="test-name"]').type("Cypress");
    cy.get('[data-test="test-address"]').type("Contact");
    cy.get('[data-test="test-age"]').type("200");

    cy.get('[data-test="submit-button"]').should("exist");
    cy.get('[data-test="submit-button"]').click();

    cy.wait(5000);
    const url = "http://localhost:5020/form";

    cy.intercept("GET", url).as("fetchData");

    cy.wait("@fetchData");

    cy.get('[data-test="Cypress-edit-button"]').should("exist");
    cy.get('[data-test="Cypress-delete-button"]').should("exist");

    cy.wait(5000);
    cy.get('[data-test="Cypress-edit-button"]').click();

    cy.get('[data-test="test-name"]').clear();
    cy.get('[data-test="test-name"]').type("Cypress2.0");
    cy.get('[data-test="test-address"]').clear();
    cy.get('[data-test="test-address"]').type("Contact2.0");
    cy.get('[data-test="test-age"]').clear();
    cy.get('[data-test="test-age"]').type("201");

    cy.get('[data-test="submit-button"]').should("exist");
    cy.get('[data-test="submit-button"]').click();

    cy.wait(3000);
    cy.wait("@fetchData");

    cy.wait(5000);
    cy.get('[data-test="Cypress2.0-delete-button"]').click();

    cy.wait(2000);
  });
});
