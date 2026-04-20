// mocka login 
const nock = require("nock");

function mockLogin() {
  return nock("https://reqres.in")
    .persist()
    .post("/api/login")
    .reply(200, {
      token: "fake-token"
    });
}

module.exports = { mockLogin };
