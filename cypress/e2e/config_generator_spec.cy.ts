// End-to-end coverage for the Tailcall Configuration Generator at /app/config.
// The schema request is intercepted with a fixture so the run is deterministic
// and independent of the network.

describe("Configuration Generator", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/.tailcallrc.schema.json", {fixture: "tailcallrc.schema.json"}).as("schema")
    cy.visit("/app/config/")
  })

  it("loads the schema and renders a valid starter configuration", () => {
    cy.contains("Schema loaded from tailcall").should("be.visible")
    cy.get("[data-testid=validation]").should("contain.text", "No schema errors")

    // YAML is the default output and reflects the seeded runtime config.
    cy.get("[data-testid=output]").should("contain.text", "port: 8000")
    cy.get("[data-testid=output]").should("contain.text", "httpCache: 42")
  })

  it("serializes the same configuration to JSON and GraphQL", () => {
    cy.contains("button", "JSON").click()
    cy.get("[data-testid=output]").should("contain.text", '"port": 8000')
    cy.get("[data-testid=output]").should("contain.text", '"httpCache": 42')

    cy.contains("button", "GraphQL").click()
    cy.get("[data-testid=output]").should("contain.text", "schema @server(port: 8000")
    cy.get("[data-testid=output]").should("contain.text", "@upstream(httpCache: 42")
  })

  it("regenerates the output when a field changes", () => {
    cy.get("input[type=number]").first().clear().type("9000")
    cy.get("[data-testid=output]").should("contain.text", "port: 9000")
  })

  it("exposes copy and download actions", () => {
    cy.get("[data-testid=copy]").should("be.visible")
    cy.contains("button", "Download").should("be.visible")
  })
})
