import { useEffect } from "react";
import { TestFormType, useTestForm } from "../hooks/useTestForm";
import { Button } from "react-bootstrap";
import TestForm from "./Form";

const ContactList = () => {
  const {
    testForm,
    handleDeleteData,
    handleForm,
    handleSubmit,
    isDelete,
    setIsDelete,
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
    <div>
      {contacts.map((c, idx) => {
        return (
          <div key={idx} className="contact-data">
            <span>{c.id}</span>
            <span>{c.name}</span>
            <span>{c.address}</span>
            <span>{c.age}</span>
            <Button onClick={() => handleDeleteData(c.id)}>Delete</Button>
            <Button onClick={() => handleUpdateData(c)}>Edit</Button>
          </div>
        );
      })}

      <TestForm
        testForm={testForm}
        handleForm={handleForm}
        handleSubmit={handleSubmit}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        setContacts={setContacts}
      />
    </div>
  );
};
export default ContactList;
