import { FormEvent, useState } from "react";

export type TestFormType = {
  id?: string;
  name: string;
  address: string;
  age: string;
};

const DEFAULT_VALUE = {
  id: "",
  name: "",
  address: "",
  age: "",
};

export const useTestForm = () => {
  const [testForm, setTestForm] = useState<TestFormType>(DEFAULT_VALUE);
  const [isDelete, setIsDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [contacts, setContacts] = useState<TestFormType[]>([]);
  const [showForm, setShowForm] = useState(false);
  // const [error, setError] = useState("");

  const getAllContacts = async () => {
    const response = await fetch(`http://localhost:5020/form`);
    const data = await response.json();
    return data;
  };

  const handleClearForm = () => {
    setTestForm(DEFAULT_VALUE);
    setShowForm(false);
  };

  const handleAddContact = () => {
    if (showForm) {
      setShowForm(false);
      setTestForm(DEFAULT_VALUE);
      return;
    }
    setShowForm(true);
  };

  const handleUpdateData = async (data: TestFormType) => {
    console.log("handleUpdateData", data);
    setTestForm(data);
    setShowForm(true);
  };

  const handleDeleteData = async (id: string | undefined) => {
    if (!id) return;
    // const delBody = { id: id };
    const response = await fetch("http://localhost:5020/form", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await response.json();

    // delete data from contact list
    const newContact = contacts.filter((c) => {
      if (c.id !== id) return c;
    });
    setContacts(newContact);
  };

  const handleGetData = async (id: string) => {
    const response = await fetch(`http://localhost:5020/form/${id}`);
    const data = await response.json();

    const form: TestFormType = {
      id: data.id,
      name: data.name,
      address: data.address,
      age: data.age,
    };

    setTestForm(form);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      id: testForm?.id,
      name: testForm.name,
      address: testForm.address,
      age: testForm.age,
    };

    let data;

    // save new contact
    if (!testForm.id) {
      const response = await fetch("http://localhost:5020/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      data = await response.json();

      // update existing contact
    } else {
      const response = await fetch("http://localhost:5020/form", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      data = await response.json();
    }

    if (testForm.id) {
      setContacts((d) => {
        return d.map((c) => {
          if (c.id === testForm.id) {
            return {
              ...c,
              name: data.name,
              address: data.address,
              age: data.age,
            };
          } else return c;
        });
      });
    }

    setTestForm(DEFAULT_VALUE);
    setShowForm(false);
  };

  // controlled component
  const handleForm = (form: TestFormType) => {
    setTestForm(form);
  };

  return {
    testForm,
    handleForm,
    handleSubmit,
    handleAddContact,
    handleGetData,
    getAllContacts,
    handleClearForm,
    isDelete,
    setIsDelete,
    handleDeleteData,
    refresh,
    setRefresh,
    contacts,
    setContacts,
    handleUpdateData,
    showForm,
  };
};
