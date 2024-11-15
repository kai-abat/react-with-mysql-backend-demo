const express = require("express");
const cors = require("cors");
const {
  saveForm,
  getForm,
  getAllForm,
  deleteForm,
  getFormByName,
} = require("./model/formModel");
const { POOL } = require("./model/db");
require("dotenv").config();

const PORT = process.env.PORT || 5020;
const app = express();

app.use(express.json());
app.use(cors());

// test end point
app.get("/", (req, res) => {
  const data = Array.from({ length: 100 }, (_, i) => i + 1);
  res.status(200).json(data);
});

app.post("/form/save", async (req, res) => {
  const { id, name, address, age } = req.body;

  console.log("save......", id, name, address, age);

  try {
    const data = await saveForm(id, name, address, age);

    console.log("data saved", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/form", async (req, res) => {
  try {
    const data = await getAllForm();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/form/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await getForm(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/form/search/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const data = await getFormByName(name);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.delete("/form/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const data = await deleteForm(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/form", async (req, res) => {
  const conn = await POOL.getConnection();

  POOL.releaseConnection(conn);

  res.send(conn);
});

const server = app.listen(PORT, (req, res) => {
  console.log(`Backend App successfully started at http://localhost:${PORT}`);
});
