import { ReactNode } from "react";
import { Table } from "react-bootstrap";

const ContactTable = ({ children }: { children: ReactNode }) => {
  return (
    <Table hover className="contact-table" bordered striped>
      <thead>
        <th className="text-center p-3">ID</th>
        <th className="table-name text-center p-3">Name</th>
        <th className="table-address text-center p-3">Address</th>
        <th className="table-age text-center p-3">Age</th>
        <th className="table-controls text-center p-3" colSpan={2}>
          Controls
        </th>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};
export default ContactTable;
