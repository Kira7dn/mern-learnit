import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import {
  Form,
  Col,
  InputGroup,
  Button,
  Row,
  Container,
  Image,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function UserInfo() {
  // Contexts
  const {
    authState: {
      user: { username, avatar },
    },
  } = useContext(AuthContext);
  const avatarPath = `http://localhost:5000/images/${avatar}`;
  // User Form
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    file: yup.mixed(),
    terms: yup.bool().required().oneOf([true], "terms must be accepted"),
  });
  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ maxWidth: 500 }} className="UserInfo m-4 text-dark">
        <Card.Title className="text-center">User Infomation</Card.Title>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center">
            <ul id="faces">
              <li>
                <img src={avatarPath} alt="" />
                <img src={avatarPath} alt="" aria-hidden />
              </li>
            </ul>
            {/* <Image
              src={avatarPath}
              roundedCircle
              width={120}
              height={120}
              className="m-4 card-image"
            ></Image> */}
          </Col>
        </Row>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            firstName: "Mark",
            lastName: "Otto",
            username: "",
            city: "",
            state: "",
            zip: "",
            file: null,
            terms: false,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik101"
                  className="position-relative"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                  />
                  {/* <Form.Control.Feedback tooltip>
                    Looks good!
                  </Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik102"
                  className="position-relative"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                  />

                  {/* <Form.Control.Feedback tooltip>
                    Looks good!
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationFormikUsername2"
                >
                  <Form.Label>Email/Username</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      name="username"
                      value={username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      disabled
                    />
                    <InputGroup.Text id="inputGroupPrepend">
                      @gmail.com
                    </InputGroup.Text>
                    {/* <Form.Control.Feedback type="invalid" tooltip>
                      {errors.username}
                    </Form.Control.Feedback> */}
                  </InputGroup>
                </Form.Group>
                {/* <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik103"
                  className="position-relative"
                >
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                  />

                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group> */}
              </Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Update Avatar</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={handleChange}
                  isInvalid={!!errors.file}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.file}
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="justify-content-center">
                <Col
                  xs="4"
                  md="4"
                  variant="primary"
                  size="lg"
                  className="d-flex justify-content-center mb-0"
                >
                  <Button type="submit">Edit</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}

export default UserInfo;
