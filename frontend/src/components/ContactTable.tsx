import { ReactNode } from "react";
import { Table } from "react-bootstrap";

const ContactTable = ({ children }: { children: ReactNode }) => {
  return (
    <Table hover className="contact-table" bordered striped>
      <thead>
        <th data-test="thead-id" className="text-center p-3">
          ID
        </th>
        <th data-test="thead-name" className="table-name text-center p-3">
          Name
        </th>
        <th data-test="thead-address" className="table-address text-center p-3">
          Address
        </th>
        <th data-test="thead-age" className="table-age text-center p-3">
          Age
        </th>
        <th
          data-test="thead-controls"
          className="table-controls text-center p-3"
          colSpan={2}
        >
          Controls
        </th>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};
export default ContactTable;
