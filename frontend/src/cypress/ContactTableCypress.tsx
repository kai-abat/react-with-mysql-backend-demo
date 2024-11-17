import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ContactTable from "../components/ContactTable";
import ContactTableData from "../components/ContactTableData";

const ContactTableCypress = () => {
  type TestFormType = {
    id?: string;
    name: string;
    address: string;
    age: string;
  };

  const handleDeleteData = async (id?: string | undefined) =>
    console.log(`Delete ${id}`);
  const handleUpdateData = async (data: TestFormType) =>
    console.log(`Update ${data}`);
  return (
    <ContactTable>
      <ContactTableData
        handleDeleteData={() => handleDeleteData("1")}
        handleUpdateData={handleUpdateData}
        name="Test 1"
        address="Address 1"
        age="Age 1"
      />
    </ContactTable>
  );
};
export default ContactTableCypress;
