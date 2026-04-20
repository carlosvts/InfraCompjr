const nock = require("nock");

beforeAll(() => {
  // bloqueia chamadas reais da API 
  nock.disableNetConnect();
});

beforeEach(() => {
  // mock de login 
  nock("https://reqres.in")
    .persist()
    .post("/api/login")
    .reply(200, {
      token: "fake-token"
    });
});