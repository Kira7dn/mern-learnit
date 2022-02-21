import { SpaceContext } from "../contexts/SpaceContext";
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
import SingleSpace from "../component/space/SingleSpace";
import AddSpaceModal from "../component/space/AddSpaceModal";
import UpdateSpaceModal from "../component/space/UpdateSpaceModal";
import addIcon from "../assets/plus-circle-fill.svg";

const Space = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    spaceState: { space, spaces, spacesLoading },
    getSpaces,
    showAddSpaceModal,
    setShowAddSpaceModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(SpaceContext);
  // Start: Get all spaces
  useEffect(() => getSpaces(), []);
  let body = null;
  if (spacesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (spaces.length < 1) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddSpaceModal.bind(this, true)}
            >
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-col-1 row-cols-md-3 g-4 mx-auto mt-3">
          {spaces.map((space) => (
            <Col key={space._id} className="my-2" sm={12} md={6} lg={4}>
              <SingleSpace space={space} />
            </Col>
          ))}
        </Row>
        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddSpaceModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-space" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}

      <AddSpaceModal />
      {space !== null && <UpdateSpaceModal />}
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

export default Space;
