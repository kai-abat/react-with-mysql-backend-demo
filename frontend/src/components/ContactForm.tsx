import { Form, Row, Col, Stack, Button } from "react-bootstrap";
import { TestFormType } from "../hooks/useTestForm";

const ContactForm = ({
  testForm,
  handleForm,
  handleSubmit,
  handleClearForm,
}: {
  testForm: TestFormType;
  handleForm: (form: TestFormType) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleClearForm: () => void;
}) => {
  const isClearDisabled =
    testForm.name.length === 0 &&
    testForm.address.length === 0 &&
    testForm.age.length === 0;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="register.firstName">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                data-test="test-name"
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
                data-test="test-address"
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
                data-test="test-age"
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

            <Stack gap={3} direction="horizontal">
              <Button variant="primary" type="submit" data-test="submit-button">
                Submit
              </Button>
              <Button
                disabled={isClearDisabled}
                variant="primary"
                type="button"
                onClick={handleClearForm}
                data-test="cancel-button"
              >
                Cancel
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default ContactForm;
