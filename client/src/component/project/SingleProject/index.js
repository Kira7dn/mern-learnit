import {
  Col,
  Container,
  ProgressBar,
  Row,
  Card,
  ListGroup,
} from "react-bootstrap";
// import ActionButtons from "./ActionButtons";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { EditText, EditTextarea } from "react-edit-text";
import moment from "moment";
import deadlineIcon from "../../../assets/deadline.png";
import projectIcon from "../../../assets/project-title.png";
import { Link } from "react-router-dom";

const SingleProject = ({
  project: {
    _id,
    title,
    description,
    deadline,
    status,
    rank,
    leader,
    members,
    children,
    progress,
    target,
  },
}) => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const { chooseItem, getOneProject } = useContext(ProjectContext);
  const ClickonProject = (id) => {
    getOneProject(id);
    chooseItem(id);
  };
  return (
    <>
      <Card
        className="shadow p-2 project-list"
        border="primary"
        onClick={ClickonProject.bind(this, _id)}
      >
        <Card.Body className="p-2">
          <Card.Title className="mb-4">
            <Row>
              <Col className="project-list-item-title col-6 p-0">
                <img src={projectIcon} className="project-icon col-4" />
                <p className="project-list-item-content text-primary">
                  {title}
                </p>
              </Col>
              <Col className="project-list-item-progress-container col-6">
                <ProgressBar
                  className="p-0 project-list-item-progress-bar"
                  animated
                  variant="success"
                  now={progress}
                  label={`Progress: ${progress}%`}
                />
              </Col>
            </Row>
          </Card.Title>
          <div className="p-0">
            <Row>
              <Col className="col-4">
                <div className="project-list-item-target">
                  <h5 className="project-list-item-target-title">Target</h5>
                  <p className="project-list-item-target-content">{target}</p>
                </div>
              </Col>
              <Col className="col-2 p-0">
                <Row className="project-list-item-leader-container mx-0">
                  <h5 className="project-list-item-leader-container-title">
                    {`Team (${members.length + 1})`}
                  </h5>
                </Row>

                <div className="project-list-item-member-list-info">
                  <div className="project-list-item-leader-info">
                    <img
                      src={
                        leader
                          ? `http://localhost:5000/images/${leader.avatar}`
                          : ""
                      }
                      className="project-list-item-leader-avatar col-4"
                    />
                    <div className="project-list-item-leader-name col-8 text-primary">
                      {leader ? leader.username : "You need asign a leader"}
                    </div>
                  </div>
                  {members.map((member) => {
                    return (
                      <div
                        key={member._id}
                        className="project-list-item-member-info"
                      >
                        <img
                          src={`http://localhost:5000/images/${member.avatar}`}
                          className="project-list-item-member-avatar"
                        />
                        <div className="project-list-item-member-name text-secondary">
                          {member.username}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col className="col-6 justify-content-end">
                <div className="project-list-item-action-item-list">
                  <h5 className="project-list-item-action-item-list-title">
                    Action Item List
                  </h5>
                  <ListGroup
                    as="ol"
                    className="project-list-item-children-list"
                    numbered
                  >
                    {children.map((child) => (
                      <ListGroup.Item
                        as="li"
                        key={child._id}
                        className="project-list-item-children-list-item "
                      >
                        <div
                          className="ms-2 me-auto"
                          onClick={chooseItem.bind(this, _id)}
                        >
                          <Row className="fw-bold">
                            <div className="col-6 project-list-item-child-title">
                              {title}
                            </div>
                            <div className="project-list-item-child-progress-container col-4">
                              <div className="col-10 project-list-item-child-progress-bar">
                                <ProgressBar
                                  className="p-0"
                                  animated
                                  variant="success"
                                  now={progress}
                                  label={`${progress}%`}
                                  style={{
                                    alignItems: "center",
                                    textAlign: "center",
                                    lineHeight: "24px",
                                    fontSize: "16px",
                                    height: "24px",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="project-list-item-child-deadline-tag col-2">
                              <h5 className="project-list-item-child-deadline-content text-danger">
                                {moment(deadline).format("DD-MMM")}
                              </h5>
                            </div>
                          </Row>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
        <div className="project-list-item-deadline-tag">
          <img
            src={deadlineIcon}
            className="project-list-item-deadline-icon col-4"
          />
          <div className="project-list-item-deadline-content text-danger">
            {moment(deadline).format("DD-MMM")}
          </div>
        </div>
      </Card>
    </>
  );
};

export default SingleProject;
