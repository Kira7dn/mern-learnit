import { SpaceContext } from "../contexts/SpaceContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import {
  Spinner,
  Card,
  Button,
  Row,
  Col,
  Toast,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import SingleProject from "../component/project/SingleProject";
import addIcon from "../assets/plus-circle-fill.svg";
import { LOCAL_STORAGE_SPACE_NAME } from "../contexts/constants";
import PathBar from "../component/layout/PathBar";
import ProjectContent from "../component/project/ProjectContent";

const ProjectList = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  // const {
  //   spaceState: { space, spaces, spacesLoading },
  //   getSpaces,
  // } = useContext(SpaceContext);

  const {
    projectState: {
      locationBar,
      space,
      project,
      projects,
      projectsLoading,
      projectLoading,
    },
    getProjects,
    getOneProject,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ProjectContext);
  const { getSpaces } = useContext(SpaceContext);

  const localSpace = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SPACE_NAME));
  const currentSpace = localSpace[0];
  const currentProject = localSpace[localSpace.length - 1];
  document.title = currentSpace.title;
  // Start: Get all spaces
  useEffect(() => getProjects(currentSpace._id), []);
  useEffect(() => getOneProject(currentProject._id), []);
  useEffect(() => getSpaces(), []);

  let body = null;
  if (projectsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (projects.length < 1) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to WorkSpace</Card.Title>
            <Card.Text>
              Click the button below to add your first Project
            </Card.Text>
            <Button variant="primary">LearnIt</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else if (localSpace.length === 1) {
    body = (
      <>
        {projects.map((project) => (
          <div key={project._id} className="m-4 col-lg-10 col-xl-8">
            <PathBar />
            <SingleProject project={project} />
          </div>
        ))}
      </>
    );
  } else if (localSpace.length > 1) {
    if (projectLoading) {
      body = (
        <>
          <PathBar />
          <div className="spinner-container">
            <Spinner animation="border" variant="info" />
          </div>
        </>
      );
    } else if (project) {
      body = (
        <div className="m-4 m-4 col-lg-10 col-xl-8">
          <PathBar />
          <ProjectContent />
        </div>
      );
    }
  }
  return (
    <>
      {body}

      {/* After space is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20px", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default ProjectList;
