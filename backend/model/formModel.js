const { POOL } = require("./db");

const getAllContact = async () => {
  const conn = await POOL.getConnection();
  const sql = "SELECT id, name, address, age FROM form";
  const [data] = await conn.query(sql);
  POOL.releaseConnection(conn);

  return data;
};

const getContact = async (id) => {
  const conn = await POOL.getConnection();
  const sql = "SELECT id, name, address, age FROM form WHERE id = ?";
  const [data] = await conn.query(sql, [id]);
  POOL.releaseConnection(conn);

  if (!data[0]) {
    throw new Error("Record not found");
  }
  return data[0];
};

const getContactByName = async (name) => {
  const conn = await POOL.getConnection();
  const sql = "SELECT id, name, address, age FROM form WHERE name = ?";
  const [data] = await conn.query(sql, [name]);
  POOL.releaseConnection(conn);

  if (!data[0]) {
    throw new Error("Record not found");
  }

  return data[0];
};

const saveContact = async (name, address, age) => {
  const conn = await POOL.getConnection();

  const sql = "INSERT INTO form (name,address,age) VALUE (?,?,?)";
  const [result] = await conn.query(sql, [name, address, age]);

  POOL.releaseConnection(conn);

  const form = await getContact(result.insertId);
  return form;
};

const updateContact = async (id, name, address, age) => {
  const conn = await POOL.getConnection();

  const sql = "UPDATE form SET name = ?, address = ?, age = ? WHERE id = ?";
  const result = await conn.query(sql, [name, address, age, id]);

  POOL.releaseConnection(conn);

  const form = await getContact(id);

  return form;
};

const deleteContact = async (id) => {
  const conn = await POOL.getConnection();
  const sql = "DELETE FROM form WHERE id = ?";
  const result = await conn.query(sql, [id]);
  POOL.releaseConnection(conn);

  return "Successfully delete " + id;
};

const deleteContactFromUsingName = async (name) => {
  try {
    if (name) {
      const foundRecord = await getContactByName(name);

      const conn = await POOL.getConnection();
      const sql = "DELETE FROM form WHERE id = ?";
      const result = await conn.query(sql, [foundRecord.id]);
      POOL.releaseConnection(conn);

      return "Successfully delete " + name;
    }
  } catch (e) {
    console.log(e.message);
  }
  return "No record found!";
};

module.exports = {
  saveContact,
  updateContact,
  getContact,
  getAllContact,
  deleteContact,
  getContactByName,
  deleteContactFromUsingName,
};
