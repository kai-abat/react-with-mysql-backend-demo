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
  // const [error, setError] = useState("");

  const getAllContacts = async () => {
    const response = await fetch(`http://localhost:5020/form`);
    const data = await response.json();
    return data;
  };

  const handleUpdateData = async (data: TestFormType) => {
    console.log("handleUpdateData", data);
    setTestForm(data);
  };

  const handleDeleteData = async (id: string | undefined) => {
    if (!id) return;
    // const delBody = { id: id };
    const response = await fetch("http://localhost:5020/form/delete", {
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

    // handle delete

    // if (testForm.id && !testForm.name) {
    //   console.log("fetch data...");
    //   await handleGetData(testForm.id);

    //   return;
    // }

    const body = {
      id: testForm?.id,
      name: testForm.name,
      address: testForm.address,
      age: testForm.age,
    };
    // fetch post here
    const response = await fetch("http://localhost:5020/form/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();

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

    console.log("output:", data);

    setTestForm(DEFAULT_VALUE);
  };

  // controlled component
  const handleForm = (form: TestFormType) => {
    setTestForm(form);
  };

  return {
    testForm,
    handleForm,
    handleSubmit,
    handleGetData,
    getAllContacts,
    isDelete,
    setIsDelete,
    handleDeleteData,
    refresh,
    setRefresh,
    contacts,
    setContacts,
    handleUpdateData,
  };
};
