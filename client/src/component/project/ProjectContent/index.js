import { Col, Row, Card, Button, Form } from "react-bootstrap";
// import ActionButtons from "./ActionButtons";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { EditText, EditTextarea } from "react-edit-text";
import moment from "moment";
import deadlineIcon from "../../../assets/deadline.png";
import projectIcon from "../../../assets/project-title.png";
import ChildProject from "./ChildrenProject";
import { Slider } from "@mui/material";
import AddMemberModal from "./AddMemberModal";

const ProjectContent = () => {
  const {
    projectState: { project },
    showAddMembersModal,
    setShowAddMembersModal,
    updateProject,
  } = useContext(ProjectContext);
  const [updatedProject, setUpdatedProject] = useState(project);
  useEffect(() => setUpdatedProject(project), [project]);
  console.log("project", project);
  console.log("updatedProject", updatedProject);
  // Progress Bar
  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];
  function valuetext(value) {
    return `${value}%`;
  }
  const {
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
  } = updatedProject;
  const onChangeUpdated = async (event) => {
    console.log(event.target.value);
    const updatedProject = { _id, [event.target.name]: event.target.value };
    updateProject(updatedProject);
  };

  const [value, setValue] = useState(progress);
  const handleProgress = async (event, newValue) => {
    setValue(newValue);
  };
  const handleProgressUpdate = () => {
    const updatedProject = { _id, progress: value };
    updateProject(updatedProject);
  };
  const onChangeUpdatedPostForm = (event) =>
    setUpdatedProject({
      ...updatedProject,
      [event.target.name]: event.target.value,
    });
  return (
    <>
      <Card
        className="shadow p-2"
        border="primary"
        style={{
          cursor: "default",
        }}
      >
        <Card.Body className="p-2">
          <Card.Title className="mb-4">
            <Row>
              <Col className="project-title col-6 p-0">
                <img src={projectIcon} className="project-icon col-4" />
                <Form.Control
                  type="text"
                  className="project-content text-primary"
                  name="title"
                  value={title}
                  onChange={onChangeUpdatedPostForm}
                  onBlur={onChangeUpdated}
                />
              </Col>
              <Col className="project-progress-container col-6">
                <h5>Progress</h5>
                <Slider
                  aria-label="Always visible"
                  value={progress}
                  getAriaValueText={valuetext}
                  valueLabelFormat={valuetext}
                  step={25}
                  marks={marks}
                  valueLabelDisplay="auto"
                  className="mx-2 mt-4"
                  name="progress"
                  onChange={onChangeUpdatedPostForm}
                  onChangeCommitted={onChangeUpdated}
                />
              </Col>
            </Row>
          </Card.Title>
          <div className="p-0">
            <Row>
              <Col className="col-6 p-1">
                <div className="project-desc">
                  <h5 className="project-desc-title">Description</h5>
                  <Form.Control
                    as="textarea"
                    className="project-desc-content"
                    name="description"
                    value={description}
                    rows={7}
                    onChange={onChangeUpdatedPostForm}
                    onBlur={onChangeUpdated}
                  />
                </div>
              </Col>
              <Col className="col-4 p-1">
                <div className="project-target">
                  <h5 className="project-target-title">Target</h5>
                  <Form.Control
                    as="textarea"
                    className="project-target-content"
                    name="target"
                    value={target}
                    rows={7}
                    onChange={onChangeUpdatedPostForm}
                    onBlur={onChangeUpdated}
                  />
                </div>
              </Col>
              <Col className="col-2 p-1">
                <Row className="leader-container mx-0">
                  <h5 className="leader-container-title text-primary">
                    Leader
                  </h5>
                  <div className="leader-info">
                    <img
                      src={
                        leader
                          ? `http://localhost:5000/images/${leader.avatar}`
                          : ""
                      }
                      className="leader-avatar col-4"
                    />
                    <div className="leader-name col-8 text-primary">
                      {leader ? leader.username : "You need asign a leader"}
                    </div>
                  </div>
                  <div className="project-leader-add">
                    <i className="fas fa-user-edit"></i>
                  </div>
                </Row>
                <Row className="leader-container mx-0">
                  <p className="text-secondary leader-container-title">{`Member(${
                    members ? members.length : "0"
                  })`}</p>
                  <div className="member-list-info">
                    {members
                      ? members.map((member) => {
                          return (
                            <div key={member._id} className="member-info">
                              <img
                                src={`http://localhost:5000/images/${member.avatar}`}
                                className="member-avatar"
                              />
                              <div className="member-name text-secondary">
                                {member.username}
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                  <div
                    className="project-members-add"
                    onClick={setShowAddMembersModal.bind(this, true)}
                  >
                    <i className="fas fa-user-plus"></i>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </Card.Body>
        <div className="deadline-tag">
          <img src={deadlineIcon} className="deadline-icon col-4" />
          <EditText
            className="deadline-content text-danger"
            name="deadline"
            defaultValue={moment(deadline).format("DD-MMM")}
            onSave={onChangeUpdated}
          />
        </div>
      </Card>
      {children ? <ChildProject children={children} /> : ""}
      <AddMemberModal members={members} />
    </>
  );
};

export default ProjectContent;
