describe("Docusaurus Site", () => {
  it("should load without errors", () => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        cy.spy(win.console, "error").as("consoleError")
      },
    })

    cy.get("@consoleError").should("not.be.called")
  })
})
