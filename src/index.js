const express = require("express");

// importa API
const { users, auth, register } = require("./api");

const app = express();

app.use(express.json());

// rotas
app.use("/users", users);
app.use("/auth", auth);
app.use("/register", register);

// health check 
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("API rodando, Comp! 🚀");
});

// porta para o Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});