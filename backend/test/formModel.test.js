const e = require("express");
const {
  getAllContact,
  getContact,
  getContactByName,
  deleteContact,
  saveContact,
  updateContact,
  deleteContactFromUsingName,
} = require("../model/formModel");

describe("Test getAllContact", () => {
  it("should return array of all contacts", async () => {
    const contacts = await getAllContact();

    expect(contacts.length).toBeGreaterThan(0);
    expect(contacts[0].id).toBe(18);
    expect(contacts[0].name).toBe("johnee");
  });
});

describe("Test getContact", () => {
  it("should return a single contact", async () => {
    const contact = await getContact(18);

    expect(contact.name).toBe("johnee");
  });

  it("should throw an error if id is invalid", async () => {
    await expect(getContact(9999)).rejects.toThrow("Record not found");
  });
});

describe("Test getContactByName", () => {
  it("should return johnee's contact data", async () => {
    const contact = await getContactByName("johnee");

    expect(contact.id).toBe(18);
  });

  it("should throw error if no contact is found", async () => {
    await expect(getContactByName("dasdas")).rejects.toThrow(
      "Record not found"
    );
  });
});

describe("Test saveContact , updateContact and deleteContact", () => {
  it("should save, update and delete new contact data", async () => {
    const name = "test insert form";
    const address = "test insert address";
    const age = "200";

    // Insert
    const contact = await saveContact(name, address, age);

    const id = contact.id;

    expect(contact.name).toEqual(name);
    expect(contact.address).toEqual(address);
    expect(contact.age).toEqual(age);

    // Update
    const name2 = "test update form";
    const address2 = "test update address";
    const age2 = "300";
    const contactUpdated = await updateContact(id, name2, address2, age2);

    expect(contactUpdated.id).toEqual(id);
    expect(contactUpdated.name).toEqual(name2);
    expect(contactUpdated.address).toEqual(address2);
    expect(contactUpdated.age).toEqual(age2);

    // Delete
    const result = await deleteContact(id);

    expect(result).toEqual(`Successfully delete ${id}`);
  });
});

describe("Test deleteContactFromUsingName", () => {
  it("should create new contact then delete using name", async () => {
    const name = "test deleteContactFromUsingName form";
    const address = "test insert address";
    const age = "200";

    // Insert
    await saveContact(name, address, age);

    await expect(deleteContactFromUsingName(name)).resolves.toEqual(
      `Successfully delete ${name}`
    );
  });

  it("should return No record found! if no name input", async () => {
    await expect(deleteContactFromUsingName("")).resolves.toEqual(
      "No record found!"
    );
  });

  it("should retun a message of No record found!", async () => {
    await expect(deleteContactFromUsingName("xxxkkklllssm")).resolves.toEqual(
      "No record found!"
    );
  });
});
