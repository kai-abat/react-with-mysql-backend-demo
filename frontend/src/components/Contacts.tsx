import { useEffect } from "react";
import { TestFormType, useTestForm } from "../hooks/useTestForm";
import ContactForm from "./ContactForm";
import ContactTable from "./ContactTable";
import ContactTableData from "./ContactTableData";
import { Stack } from "react-bootstrap";

const Contacts = () => {
  const {
    testForm,
    handleDeleteData,
    handleForm,
    handleSubmit,
    handleClearForm,
    contacts,
    setContacts,
    handleUpdateData,
  } = useTestForm();
  // const [contacts, setContacts] = useState<TestFormType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:5020/form`);
      const data: TestFormType[] = await response.json();
      // return data;
      // const data = await getAllContacts();
      setContacts(data);
      // if (refresh) setRefresh(false);
    };
    getData();

    const interval = setInterval(() => {
      console.log("This will run every 5 second!");
      getData();
    }, 5000);
    return () => clearInterval(interval);
  }, [setContacts]);

  return (
    <Stack gap={3}>
      <h1>Contacts</h1>
      <ContactTable>
        {contacts.map((c, idx) => {
          return (
            <ContactTableData
              key={idx}
              id={c.id}
              name={c.name}
              address={c.address}
              age={c.age}
              handleDeleteData={handleDeleteData}
              handleUpdateData={handleUpdateData}
            />
          );
        })}
      </ContactTable>

      {testForm.id && (
        <ContactForm
          testForm={testForm}
          handleForm={handleForm}
          handleSubmit={handleSubmit}
          handleClearForm={handleClearForm}
        />
      )}
    </Stack>
  );
};
export default Contacts;