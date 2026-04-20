const nock = require("nock");

function mockLoginSuccess() {
  return nock("https://reqres.in")
    .post("/api/login")
    .reply(200, {
      token: "fake-token"
    });
}

module.exports = {
  mockLoginSuccess
};