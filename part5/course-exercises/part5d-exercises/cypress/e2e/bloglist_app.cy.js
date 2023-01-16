describe("Blog List app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:8888/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "test",
    };
    const user2 = {
      name: "Test User 2",
      username: "testuser2",
      password: "test2",
    };

    cy.request("POST", "http://localhost:8888/api/users", user);
    cy.request("POST", "http://localhost:8888/api/users", user2);
    cy.visit("http://localhost:8888/");
  });

  it("login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("login");
  });

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get(".username").type("testuser");
      cy.get(".password").type("test");
      cy.get(".login-button").click();
      cy.contains("Test User logged in").should(
        "have.css",
        "color",
        "rgb(0, 128, 0)"
      );
    });

    describe("when logged in", function () {
      beforeEach(function () {
        cy.login({ username: "testuser", password: "test" });
      });

      it("can create blog", function () {
        cy.contains("create new blog").click();
        cy.get(".blog-title").type("new blog");
        cy.get(".blog-author").type("blog author");
        cy.get(".blog-url").type("some url");
        cy.get(".create-blog").click();
        cy.contains("a new blog new blog by blog author added");
        cy.contains("new blog blog author view");
      });

      it("can view new blog info", function () {
        cy.addBlog({
          title: "some title",
          author: "author name",
          url: "some url",
        });
        cy.contains("some title author name view").get(".view-blog").click();
        cy.contains("likes 0 like");
        cy.contains("Test User");
      });

      it("can view new blog info of second blog post and add like", function () {
        cy.addBlog({
          title: "first",
          author: "first author",
          url: "some url",
        });
        cy.addBlog({
          title: "second",
          author: "second author",
          url: "some url",
        });
        cy.contains("second second author").parent().find(".view-blog").click();
        cy.contains("second second author").parent().find(".likeBtn").click();
        cy.contains("likes 1 like");
      });

      it("can delete blog from list", function () {
        cy.addBlog({
          title: "first",
          author: "first author",
          url: "some url",
        });
        cy.addBlog({
          title: "second",
          author: "second author",
          url: "some url",
        });
        cy.contains("second second author").parent().find(".view-blog").click();
        cy.contains("second second author")
          .parent()
          .find(".remove-blog")
          .click();
        cy.contains("second second author").should("not.exist");
      });

      it("blog posts are sorted by likes", function () {
        cy.addBlog({
          title: "title of second most likes",
          author: "second author",
          url: "some url",
          likes: 5,
        });
        cy.addBlog({
          title: "title of most likes",
          author: "most liked author",
          url: "some url",
          likes: 10,
        });
        cy.addBlog({
          title: "some blog",
          author: "third author",
          url: "some url",
          likes: 0,
        });
        cy.get(".blog-list>li").eq(0)
          .should("contain", "title of most likes");
        cy.get(".blog-list>li").eq(1)
          .should("contain", "title of second most likes");
        cy.get(".blog-list>li").eq(2)
          .should("contain", "some blog");
      });

      it("can logout", function () {
        cy.contains("Logout").click();
        cy.contains("log in to application");
        cy.contains("login");
      });

      it("users can't delete other user's blog posts", function () {
        cy.addBlog({
          title: "first",
          author: "first author",
          url: "some url",
        });
        cy.addBlog({
          title: "second",
          author: "second author",
          url: "some url",
        });
        cy.contains("Logout").click();

        cy.login({ username: "testuser2", password: "test2" });
        cy.contains("second second author").parent().find(".view-blog").click();
        cy.contains("second second author")
          .parent()
          .find(".remove-blog")
          .click();
        cy.contains("Only original poster can delete this blog post");
      });
    });

    it("fails with wrong credentials", function () {
      cy.get(".username").type("nonuser");
      cy.get(".password").type("wrong");
      cy.get(".login-button").click();
      cy.contains("Wrong username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });
});
