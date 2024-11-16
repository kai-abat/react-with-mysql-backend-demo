const { POOL } = require("../model/db");

describe("Test MySQL Database", () => {
  it.only("should check the database connection and sql queries", async () => {
    const name = "test_name";
    const address = "test_address";
    const age = 99;
    let db;
    db = await POOL.getConnection();
    const [result] = await db.query(
      "INSERT INTO test_db (name, address,age) VALUES (?, ?,?)",
      [name, address, age]
    );
    POOL.releaseConnection(db);
    const id = result.insertId;

    db = await POOL.getConnection();
    const [rows] = await db.query("SELECT * FROM test_db WHERE id = ?", [id]);
    POOL.releaseConnection(db);
    const data = rows[0];

    expect(data.name).toBe(name);
    expect(data.address).toBe(address);
    expect(data.age).toBe(age);

    db = await POOL.getConnection();
    await db.query("DELETE FROM test_db");
    POOL.releaseConnection(db);
  });
});
