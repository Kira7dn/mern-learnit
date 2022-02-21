import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Col, Container } from "react-bootstrap";
import ActionButtons from "./ActionButtons";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const SingleSpace = ({
  space: { _id, title, description, image, rank, members },
}) => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const imagePath = `http://localhost:5000/images/${image}`;
  return (
    <Card
      className="shadow p-2"
      border="primary"
      style={{
        cursor: "default",
      }}
    >
      <Card.Body className="p-2">
        <Card.Title>
          <Row>
            <Col className="col-8">
              <p className="space-title">{title}</p>
            </Col>
            <Col className="text-end">
              <ActionButtons _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Container className="p-0 ">
          <Row>
            <Col className="col-4 d-flex align-items-center">
              <img src={image} className="space-img" />
            </Col>
            <Col className="col-8">
              <p className="space-desc">{description}</p>
            </Col>
          </Row>
          <Row className="mt-4 ">
            <Col className="col-4 d-flex align-items-center">
              <p>Team</p>
            </Col>
            <Col className="col-8 team-list">
              <div>
                {members.map((member) => {
                  const memberInfo =
                    member.recipient.username !== username
                      ? member.recipient
                      : member.requester;
                  return (
                    <div key={member._id} className="member-info">
                      <img
                        src={`http://localhost:5000/images/${memberInfo.avatar}`}
                        className="member-avatar"
                      />
                      <div className="member-name">{memberInfo.username}</div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleSpace;
