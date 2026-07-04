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

    // GraphQL is the default output and reflects the seeded starter config.
    cy.get("[data-testid=output]").should("contain.text", "schema @server(port: 8000)")
    cy.get("[data-testid=output]").should("contain.text", "type Query")
    cy.get("[data-testid=output]").should("contain.text", "@http(url:")
  })

  it("serializes the same configuration to JSON and YAML", () => {
    cy.contains("button", "JSON").click()
    cy.get("[data-testid=output]").should("contain.text", '"port": 8000')
    cy.get("[data-testid=output]").should("contain.text", '"query": "Query"')

    cy.contains("button", "YAML").click()
    cy.get("[data-testid=output]").should("contain.text", "port: 8000")
    cy.get("[data-testid=output]").should("contain.text", "query: Query")
  })

  it("regenerates the output when a field changes", () => {
    cy.get("input[type=number]").first().clear().type("9000")
    cy.get("[data-testid=output]").should("contain.text", "schema @server(port: 9000)")
  })

  it("exposes copy and download actions", () => {
    cy.get("[data-testid=copy]").should("be.visible")
    cy.contains("button", "Download").should("be.visible")
  })
})
