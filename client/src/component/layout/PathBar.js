import { LOCAL_STORAGE_SPACE_NAME } from "../../contexts/constants";
import { Link } from "react-router-dom";
import { Spinner, Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { ProjectContext } from "../../contexts/ProjectContext";
import { SpaceContext } from "../../contexts/SpaceContext";

import { useContext } from "react";

const PathBar = () => {
  const localSpace = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SPACE_NAME));
  const [spaceItem, ...projectItems] = localSpace;
  const {
    projectState: { locationBar, space, project, projects, projectLoading },
    getOneProject,
    getProjects,
    chooseItem,
  } = useContext(ProjectContext);
  const { getSpaces } = useContext(SpaceContext);
  const selectItem = (id) => {
    getSpaces();
    chooseItem(id);
    getOneProject(id);
  };
  const selectSpace = (id) => {
    getProjects(id);
    chooseItem(id);
  };
  return (
    <ButtonGroup aria-label="Basic example" className="path-bar col-8">
      <Button
        variant="primary"
        key={spaceItem._id}
        onClick={selectSpace.bind(this, spaceItem._id)}
        as={Link}
        to="/work-space/project"
        className="path-bar-space"
      >
        {spaceItem.title}
      </Button>
      {projectItems.map((item, i) => (
        <Button
          variant="secondary"
          key={item._id}
          onClick={selectItem.bind(this, item._id)}
          className="path-bar-project"
        >
          {item.title}
        </Button>
      ))}
    </ButtonGroup>
  );
};
export default PathBar;
