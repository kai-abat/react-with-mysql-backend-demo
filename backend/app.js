const express = require("express");
const cors = require("cors");
const {
  saveContact,
  getContact,
  getAllContact,
  deleteContact,
  getContactByName,
  updateContact,
} = require("./model/formModel");
const { POOL } = require("./model/db");
require("dotenv").config();

const PORT = process.env.PORT || 5020;
const app = express();

app.use(express.json());
app.use(cors());

let count = 0;
app.get("/", (req, res) => {
  count++;
  res.send(`Hi sup? You're the No. ${count} visitor here.`);
});

app.post("/form", async (req, res) => {
  const { name, address, age } = req.body;

  try {
    const data = await saveContact(name, address, age);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.put("/form", async (req, res) => {
  const { id, name, address, age } = req.body;

  try {
    const data = await updateContact(id, name, address, age);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/form", async (req, res) => {
  try {
    const data = await getAllContact();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/form/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await getContact(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/form/search/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const data = await getContactByName(name);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.delete("/form", async (req, res) => {
  const { id } = req.body;

  try {
    const data = await deleteContact(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = app;
