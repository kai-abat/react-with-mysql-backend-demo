import ContactTableCypress from "../../src/cypress/ContactTableCypress";

describe("Test Contact Table Component", () => {
  beforeEach(() => {
    cy.mount(<ContactTableCypress />);
  });
  it("Header ID Should display", () => {
    cy.get('[data-test="thead-id"]').should("exist");
    cy.get('[data-test="thead-id"]').should("be.visible");
    cy.get('[data-test="thead-id"]').should("have.text", "ID");
    // cy.get(".table-name").should("exist");
    // cy.get(".table-name").should("visible");
    // cy.get(".table-name").should("have.text", "ID");
  });
  it("Header Name Should display", () => {
    cy.get('[data-test="thead-name"]').should("exist");
    cy.get('[data-test="thead-name"]').should("be.visible");
    cy.get('[data-test="thead-name"]').should("have.text", "Name");
  });

  it("Header Controls Should display", () => {
    cy.get('[data-test="thead-controls"]').should("exist");
    cy.get('[data-test="thead-controls"]').should("be.visible");
    cy.get('[data-test="thead-controls"]').should("have.text", "Controls");
  });
});
