import { Button } from "react-bootstrap";
import { TestFormType } from "../hooks/useTestForm";

type ContactDataTypes = {
  id?: string;
  name: string;
  address: string;
  age: string;
  handleDeleteData: (id?: string) => Promise<void>;
  handleUpdateData: (data: TestFormType) => Promise<void>;
};

const ContactTableData = (props: ContactDataTypes) => {
  const { id, name, address, age, handleUpdateData, handleDeleteData } = props;

  return (
    <tr>
      <td className="text-center p-3">{id}</td>
      <td className="text-center text-capitalize p-3">{name}</td>
      <td className="text-center text-capitalize p-3">{address}</td>
      <td className="text-center p-3">{age}</td>
      <td className="text-center p-3">
        <Button onClick={() => handleUpdateData({ id, name, address, age })}>
          Edit
        </Button>
      </td>
      <td className="text-center p-3">
        <Button onClick={() => handleDeleteData(id)}>Delete</Button>
      </td>
    </tr>
  );
};
export default ContactTableData;
