const nock = require("nock");

// ─────────────────────────────────────────────────────────────────────────────
// ORDEM DE EXECUÇÃO DO JEST (por spec file):
//   1. setupFiles       → dev.js  (define BASE_URL, AUTH_EMAIL, AUTH_PASSWORD)
//   2. setupFilesAfterEnv → setup.js (módulo executa → setupNock() roda aqui)
//   3. beforeAll dos specs → auth.login() chamado  ← nock já existe
//   4. beforeEach → renova interceptors entre testes
//   5. cada it()
//   6. afterEach
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN = "QpwL5tpe83ilfWwmjazY";

const usersPage1 = {
  page: 1,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    { id: 1,  email: "george.bluth@reqres.in",     first_name: "George",  last_name: "Bluth",    avatar: "https://reqres.in/img/faces/1-image.jpg"  },
    { id: 2,  email: "janet.weaver@reqres.in",     first_name: "Janet",   last_name: "Weaver",   avatar: "https://reqres.in/img/faces/2-image.jpg"  },
    { id: 3,  email: "emma.wong@reqres.in",        first_name: "Emma",    last_name: "Wong",     avatar: "https://reqres.in/img/faces/3-image.jpg"  },
    { id: 4,  email: "eve.holt@reqres.in",         first_name: "Eve",     last_name: "Holt",     avatar: "https://reqres.in/img/faces/4-image.jpg"  },
    { id: 5,  email: "charles.morris@reqres.in",   first_name: "Charles", last_name: "Morris",   avatar: "https://reqres.in/img/faces/5-image.jpg"  },
    { id: 6,  email: "tracey.ramos@reqres.in",     first_name: "Tracey",  last_name: "Ramos",    avatar: "https://reqres.in/img/faces/6-image.jpg"  },
  ],
};

const usersPage2 = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    { id: 7,  email: "michael.lawson@reqres.in",   first_name: "Michael", last_name: "Lawson",   avatar: "https://reqres.in/img/faces/7-image.jpg"  },
    { id: 8,  email: "lindsay.ferguson@reqres.in", first_name: "Lindsay", last_name: "Ferguson", avatar: "https://reqres.in/img/faces/8-image.jpg"  },
    { id: 9,  email: "tobias.funke@reqres.in",     first_name: "Tobias",  last_name: "Funke",    avatar: "https://reqres.in/img/faces/9-image.jpg"  },
    { id: 10, email: "byron.fields@reqres.in",     first_name: "Byron",   last_name: "Fields",   avatar: "https://reqres.in/img/faces/10-image.jpg" },
    { id: 11, email: "george.edwards@reqres.in",   first_name: "George",  last_name: "Edwards",  avatar: "https://reqres.in/img/faces/11-image.jpg" },
    { id: 12, email: "rachel.howell@reqres.in",    first_name: "Rachel",  last_name: "Howell",   avatar: "https://reqres.in/img/faces/12-image.jpg" },
  ],
};

const allUsers = [...usersPage1.data, ...usersPage2.data];

function setupNock() {
  nock.cleanAll();

  const api = nock("https://reqres.in").persist();

  // ── Login ─────────────────────────────────────────────────────────────────
  // Aceita qualquer combinação de email + password (não vazia).
  // Isso cobre:
  //   - login normal:    eve.holt@reqres.in / cityslicka  (AUTH_PASSWORD)
  //   - login pós-register: eve.holt@reqres.in / pistol   (senha do register)
  api
    .post("/api/login", (body) => Boolean(body && body.email && body.password))
    .reply(200, { token: TOKEN });

  // Login sem password → 400
  api
    .post("/api/login", (body) => Boolean(body && body.email && !body.password))
    .reply(400, { error: "Missing password" });

  // ── Register ──────────────────────────────────────────────────────────────
  // Aceita qualquer email + password presentes
  api
    .post("/api/register", (body) => Boolean(body && body.email && body.password))
    .reply(200, (uri, body) => {
      const user = allUsers.find((u) => u.email === body.email);
      return { id: user ? user.id : 4, token: TOKEN };
    });

  // Register sem password → 400
  api
    .post("/api/register", (body) => Boolean(body && body.email && !body.password))
    .reply(400, { error: "Missing password" });

  // ── Users — listagem ──────────────────────────────────────────────────────
  api.get("/api/users").reply(200, usersPage1);
  api.get("/api/users").query({ page: "1" }).reply(200, usersPage1);
  api.get("/api/users").query({ page: 1   }).reply(200, usersPage1);
  api.get("/api/users").query({ page: "2" }).reply(200, usersPage2);
  api.get("/api/users").query({ page: 2   }).reply(200, usersPage2);

  // ── Users — busca individual (IDs 1–12) ───────────────────────────────────
  allUsers.forEach(({ id, email, first_name, last_name, avatar }) => {
    api.get(`/api/users/${id}`).reply(200, {
      data: { id, email, first_name, last_name, avatar },
    });
  });

  // Usuário inexistente
  api.get("/api/users/23").reply(404, {});
}

// Chamada imediata — interceptors ativos antes do beforeAll dos specs
setupNock();

beforeEach(() => {
  setupNock();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});