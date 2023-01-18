Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:8888/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedUser", JSON.stringify(body));
    cy.visit("http://localhost:8888");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: "http://localhost:8888/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:8888");
});
