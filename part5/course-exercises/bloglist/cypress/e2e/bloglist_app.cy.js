describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:8888/api/testing/reset");
    const testUser = {
      name: "Test User",
      username: "testuser",
      password: "test",
    };
    cy.request("POST", "http://localhost:8888/api/users", testUser);
    cy.visit("http://localhost:8888");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("testuser");
      cy.get("input:last").type("test");
      cy.get("#login-btn").click();

      cy.contains("Test User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("testuser");
      cy.get("input:last").type("wrong");
      cy.get("#login-btn").click();

      cy.contains("Invalid username or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
        .should("have.css", "border", "2px solid rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("testuser");
      cy.get("input:last").type("test");
      cy.get("#login-btn").click();
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get(".input-title").type("Wow Blog");
      cy.get(".input-author").type("This Author");
      cy.get(".input-url").type("Epic url");
      cy.get(".create-blog-btn").click();
      cy.contains('Blog "Wow Blog" by This Author added');
      cy.contains("Wow Blog This Author view");
    });
  });
});
