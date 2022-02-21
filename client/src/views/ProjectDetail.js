import { SpaceContext } from "../contexts/SpaceContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Spinner, Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import ProjectContent from "../component/project/ProjectContent";
import { LOCAL_STORAGE_SPACE_NAME } from "../contexts/constants";
import { Link } from "react-router-dom";
import PathBar from "../component/layout/PathBar";

const Project = () => {
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
    projectState: { locationBar, space, project, projects, projectLoading },
    getOneProject,
    chooseItem,
  } = useContext(ProjectContext);
  const localSpace = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SPACE_NAME));
  const currentProject = localSpace[localSpace.length - 1];
  document.title = currentProject.title;
  useEffect(() => getOneProject(currentProject._id), []);
  const selectItem = async (id) => {
    await chooseItem(id);
    await getOneProject(id);
  };
  const [spaceItem, ...projectItems] = localSpace;

  let body = null;
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
  return <>{body}</>;
};

export default Project;
