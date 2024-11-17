const request = require("supertest");
const app = require("../app");

beforeAll(() => {
  app.listen(5030);
});

describe("Get all contact", () => {
  it("wil get all contacts from /form and should be json content type header", async () => {
    const response = await request(app).get("/form");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("will get all contacts from /form and check the first fetch contact", async () => {
    const response = await request(app).get("/form");
    expect(response.status).toBe(200);

    const contacts = response.body;
    const contact = contacts[0];
    expect(contact.id).toBe(18);
    expect(contact.name).toBe("johnee");
    expect(contact.address).toBe("address50");
    expect(contact.age).toBe("56");
  });
});

describe("Get specific contact", () => {
  it("will get the contact of joey from /form/:id and should be json content type header", async () => {
    const response = await request(app).get("/form/113");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("will get the contact of joey from /form/:id", async () => {
    const response = await request(app).get("/form/113");
    expect(response.status).toBe(200);

    const contact = response.body;

    expect(contact.id).toBe(113);
    expect(contact.name).toBe("Stephen Curry");
    expect(contact.address).toBe("Address100");
    expect(contact.age).toBe("38");
  });

  it("will get contact using name", async () => {
    const response = await request(app).get("/form/search/johnee");

    expect(response.status).toBe(200);

    const contact = response.body;

    expect(contact.id).toBe(18);
    expect(contact.name).toBe("johnee");
    expect(contact.address).toBe("address50");
    expect(contact.age).toBe("56");
  });
});

describe("POST and save contact to /form", () => {
  it("should create a new contact", async () => {
    const name = "test form";
    const address = "test address";
    const age = "200";
    const response = await request(app).post("/form").send({
      name,
      address,
      age,
    });

    expect(response.status).toBe(200);

    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );

    const contact = response.body;
    expect(contact.name).toBe(name);
    expect(contact.address).toBe(address);
    expect(contact.age).toBe(age);
  });
});

describe("UPDATE a contact to /form", () => {
  it("should update a contact", async () => {
    // AAA principle:
    // arrange
    const id = 128;
    const name = "Ronaldo";
    const address = "Address 30";
    const age = "200";

    // act
    const response = await request(app).put("/form").send({
      id,
      name,
      address,
      age,
    });
    const contact = response.body;

    // assert
    expect(response.status).toBe(200);

    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );

    expect(contact.name).toBe(name);
    expect(contact.address).toBe(address);
    expect(contact.age).toBe(age);
  });
});

describe("Create a contact then delete the created contact", () => {
  it("should delete the contact", async () => {
    const name = "test delete form";
    const address = "test delete address";
    const age = "200";

    const response = await request(app).post("/form").send({
      name,
      address,
      age,
    });
    const id = response.body.id;

    expect(id).toEqual(expect.any(Number));

    const response2 = await request(app).delete("/form").send({
      id,
    });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
