"use strict";
describe("Docusaurus Site", function () {
    it("should load without errors", function () {
        cy.visit("http://localhost:3000", {
            onBeforeLoad: function (win) {
                cy.spy(win.console, "error").as("consoleError");
            },
        });
        cy.get("@consoleError").should("not.be.called");
    });
});
