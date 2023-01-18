describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:8888/api/testing/reset");
    const testUser = {
      name: "Test User",
      username: "testuser",
      password: "test",
    };
    const testUser2 = {
      name: "Test User 2",
      username: "testuser2",
      password: "test2",
    };
    cy.request("POST", "http://localhost:8888/api/users", testUser);
    cy.request("POST", "http://localhost:8888/api/users", testUser2);
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

  describe("When testuser logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "test" });
    });

    it("Can logout", function () {
      cy.get("#logout-btn").click();
      cy.contains("log in to application");
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

    it("A blog can be liked", function () {
      cy.createBlog({ title: "My Blog", author: "My Author", url: "My url" });
      cy.get(".blog-info").find(".toggler").click();
      cy.get(".like-btn").click();
      cy.contains("likes 1 like");
    });

    it("A blog can be deleted", function () {
      cy.createBlog({ title: "My Blog", author: "My Author", url: "My url" });
      cy.get(".blog-info").find(".toggler").click();
      cy.get(".delete-btn").click();
      cy.get(".blog-info").should("not.exist");
    });

    it("A blog by another user cannot be deleted", function () {
      cy.get("#logout-btn").click();
      cy.login({ username: "testuser2", password: "test2" });
      cy.createBlog({ title: "My Blog", author: "My Author", url: "My url" });
      cy.get("#logout-btn").click();
      cy.login({ username: "testuser", password: "test" });

      cy.get(".blog-info").find(".toggler").click();
      cy.get(".delete-btn").click();
      cy.contains("Error: Only original blog post user can delete this post")
        .should("have.css", "color", "rgb(255, 0, 0)")
        .should("have.css", "border", "2px solid rgb(255, 0, 0)");
    });

    it("blogs are sorted by likes", function () {
      cy.createBlog({
        title: "second liked blog",
        author: "second liked author",
        url: "some url",
        likes: 5,
      });
      cy.createBlog({
        title: "most liked blog",
        author: "most liked author",
        url: "some url",
        likes: 10,
      });
      cy.createBlog({
        title: "third liked blog",
        author: "third liked author",
        url: "some url",
        likes: 0,
      });

      cy.get(".blog-list>.blog-info")
        .eq(0)
        .should("contain", "most liked blog");
      cy.get(".blog-list>.blog-info")
        .eq(1)
        .should("contain", "second liked blog");
      cy.get(".blog-list>.blog-info")
        .eq(2)
        .should("contain", "third liked blog");
    });
  });
});
