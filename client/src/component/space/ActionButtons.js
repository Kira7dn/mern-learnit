import Button from "react-bootstrap/Button";
import { SpaceContext } from "../../contexts/SpaceContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ActionButtons = ({ _id }) => {
  const { deleteSpace, findSpace, setShowUpdateSpaceModal } =
    useContext(SpaceContext);
  const { chooseItem } = useContext(ProjectContext);
  const choosePost = (spaceId) => {
    findSpace(spaceId);
    setShowUpdateSpaceModal(true);
  };
  return (
    <>
      <Button
        className="post-button"
        target="_blank"
        onClick={chooseItem.bind(this, _id)}
        to={`/work-space/project`}
        as={Link}
      >
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/project-management-1628740-1380328.png"
          alt="play"
          width="24"
          height="24"
        />
      </Button>
      <Button className="post-button" onClick={choosePost.bind(this, _id)}>
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/edit-734-445212.png"
          alt="edit"
          width="24"
          height="24"
        />
      </Button>
      <Button className="post-button" onClick={deleteSpace.bind(this, _id)}>
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-771-590901.png"
          alt="delete"
          width="24"
          height="24"
        />
      </Button>
    </>
  );
};
export default ActionButtons;
