import { Form, Row, Col, Stack, Button } from "react-bootstrap";
import { TestFormType } from "../hooks/useTestForm";

const TestForm = ({
  testForm,
  handleForm,
  handleSubmit,
  isDelete,
  setIsDelete,
}: {
  testForm: TestFormType;
  handleForm: (form: TestFormType) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isDelete: boolean;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="register.firstName">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Name"
                value={testForm.name}
                onChange={(e) =>
                  handleForm({
                    ...testForm,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="register.address">
              <Form.Control
                type="text"
                placeholder="Address"
                value={testForm.address}
                onChange={(e) =>
                  handleForm({
                    ...testForm,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="register.age">
              <Form.Control
                type="text"
                placeholder="Age"
                value={testForm.age}
                onChange={(e) =>
                  handleForm({
                    ...testForm,
                    age: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Stack
              gap={3}
              direction="horizontal"
              className=" justify-content-between"
            >
              <Button variant="primary" type="submit">
                Submit
              </Button>
              {testForm.name && (
                <Form.Group className="mb-3" controlId="register.deleteCheck">
                  <Form.Check
                    type="checkbox"
                    label={`Delete Record ${testForm.name}?`}
                    checked={isDelete}
                    onChange={(e) => setIsDelete(e.target.checked)}
                  />
                </Form.Group>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default TestForm;
