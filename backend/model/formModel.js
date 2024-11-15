const { POOL } = require("./db");

const getAllForm = async (id) => {
  console.log("getForm...", id);
  const conn = await POOL.getConnection();
  const sql = "SELECT id, name, address, age FROM form";
  const [data] = await conn.query(sql, [id]);
  POOL.releaseConnection(conn);

  console.log("getForm data");

  return data;
};

const getForm = async (id) => {
  console.log("getForm...", id);
  const conn = await POOL.getConnection();
  const sql = "SELECT id, name, address, age FROM form WHERE id = ?";
  const [data] = await conn.query(sql, [id]);
  POOL.releaseConnection(conn);

  console.log("getForm data.at(0)", data[0]);

  if (!data[0]) {
    throw new Error("Record not found");
  }
  console.log("getForm data.at(0)22", data[0]);
  return data[0];
};

const getFormByName = async (name) => {
  console.log("getForm...", name);
  const conn = await POOL.getConnection();
  const sql = "SELECT id, name, address, age FROM form WHERE name = ?";
  const [data] = await conn.query(sql, [name]);
  POOL.releaseConnection(conn);

  console.log("getForm data.at(0)", data[0]);

  if (!data[0]) {
    throw new Error("Record not found");
  }
  console.log("getForm data.at(0)22", data[0]);

  return data[0];
};

const saveForm = async (id, name, address, age) => {
  const conn = await POOL.getConnection();

  if (!id) {
    console.log("saveForm insert...");
    const sql = "INSERT INTO form (name,address,age) VALUE (?,?,?)";
    const [result] = await conn.query(sql, [name, address, age]);
    console.log("saveForm", result.insertId);
  } else {
    console.log("saveForm update...");
    const sql = "UPDATE form SET name = ?, address = ?, age = ? WHERE id = ?";
    const result = await conn.query(sql, [name, address, age, id]);

    console.log("updateForm", result);
  }

  POOL.releaseConnection(conn);

  let form;
  if (id) {
    form = await getForm(id);
  } else {
    form = await getForm(result.insertId);
  }
  console.log("saveForm form", form);
  return form;
};

const deleteForm = async (id) => {
  console.log("deleteForm...");
  if (id) {
    const conn = await POOL.getConnection();
    const sql = "DELETE FROM form WHERE id = ?";
    const result = await conn.query(sql, [id]);
    POOL.releaseConnection(conn);
    console.log("deleteForm result", result);
  }

  return "success delete " + id;
};

const deleteFormUsingName = async (name) => {
  console.log("deleteForm...");
  if (name) {
    const foundRecord = await getFormByName(name);

    if (!foundRecord.id) return foundRecord;

    if (foundRecord.id) {
      const conn = await POOL.getConnection();
      const sql = "DELETE FROM form WHERE id = ?";
      const result = await conn.query(sql, [foundRecord.id]);
      POOL.releaseConnection(conn);
      console.log("deleteForm result", result);
    }
  }

  return "success delete " + id;
};

module.exports = {
  saveForm,
  getForm,
  getAllForm,
  deleteForm,
  getFormByName,
  deleteFormUsingName,
};
