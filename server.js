fetch("http://localhost:3000/modelos")

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());

const PORT = 3000;

// 🔥 conexão MongoDB
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;

async function conectarBanco() {
  await client.connect();
  console.log("Conectado ao MongoDB");

  db = client.db("museu");
}

conectarBanco();

// 🔽 rota GET com filtro
app.get("/modelos", async (req, res) => {
  const categoria = req.query.categoria;

  let filtro = {};

  if (categoria) {
    filtro.categoria = categoria;
  }

  const modelos = await db
    .collection("modelos")
    .find(filtro)
    .toArray();

  res.json(modelos);
});

app.use(express.json()); // 👈 TEM que ter

app.post("/modelos", async (req, res) => {
  console.log("POST funcionando");

  const novoModelo = req.body;

  const resultado = await db
    .collection("modelos")
    .insertOne(novoModelo);

  res.json(resultado);
});

app.post("/modelos", async (req, res) => {
  const novoModelo = req.body;

  try {
    const resultado = await db
      .collection("modelos")
      .insertOne(novoModelo);

    res.status(201).json({
      mensagem: "Modelo criado com sucesso",
      id: resultado.insertedId
    });

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar" });
  }
});

// 🔽 iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});