import { Col, Container, ProgressBar, Row, Card } from "react-bootstrap";
import moment from "moment";
import deadlineIcon from "../../../../assets/deadline.png";
import { useContext } from "react";
import { ProjectContext } from "../../../../contexts/ProjectContext";

const ChildProject = ({
  child: {
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
  const { chooseItem, getOneProject } = useContext(ProjectContext);
  const selectItem = (id) => {
    chooseItem(id);
    getOneProject(id);
  };
  return (
    <div className="ms-2 me-auto" onClick={selectItem.bind(this, _id)}>
      <Row /* className="project-child-title" */ className="fw-bold">
        <div className="col-6 project-child-title">{title}</div>
        <div className="project-child-progress-container col-4">
          <div className="col-10 project-child-progress-bar">
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
        <div className="project-child-deadline-tag col-2">
          <h5 className="project-child-deadline-content text-danger">
            {moment(deadline).format("DD-MMM")}
          </h5>
        </div>
      </Row>

      <Row>
        <Col className="col-10">
          <div className="project-child-desc">
            <p className="project-child-desc-content">{description}</p>
          </div>
        </Col>
        <Col className="project-child-leader-container col-2">
          <div className="project-child-leader-info">
            <img
              src={
                leader ? `http://localhost:5000/images/${leader.avatar}` : ""
              }
              className="project-child-leader-avatar col-4"
            />
            <div className="project-child-leader-name col-8 text-primary">
              {leader ? leader.username : ""}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChildProject;
