import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Card, Container } from "react-bootstrap";
import { useContext, useState, useEffect, useCallback } from "react";
import { SpaceContext } from "../../../contexts/SpaceContext";
import { FriendContext } from "../../../contexts/FriendContext";
import { AuthContext } from "../../../contexts/AuthContext";
import StarRatings from "react-star-ratings";
import SingleFriend from "./SingleFriend";
import { Link } from "react-router-dom";
import { imgUrl } from "../../../contexts/constants";

const AddMembersModal = ({ setNewPost, newPost }) => {
  // COntext
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const { showAddMembersModal, setShowAddMembersModal } =
    useContext(SpaceContext);
  const {
    friendState: { friends, friendsLoading, users, pendings },
    getFriends,
  } = useContext(FriendContext);
  // State
  const defaultImage = `${imgUrl}/default-space.jpg`;
  const { image, rank, members } = newPost;

  const [preMembers, setPreMembers] = useState(members);
  const setMember = (newMembers) => {
    setPreMembers([...preMembers, newMembers]);
  };
  const removeMember = useCallback(
    (_id) => setPreMembers(preMembers.filter((member) => member._id !== _id)),
    [preMembers]
  );
  const closeDialog = () => {
    resetAddMembersData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setNewPost({ ...newPost, members: preMembers });
    setShowAddMembersModal(false);
  };
  const resetAddMembersData = () => {
    setPreMembers(members);
    setShowAddMembersModal(false);
  };

  useEffect(() => getFriends(), []);
  function FriendList(props) {
    if (friends.length < 1)
      return (
        <div className="friend-window-space">
          <Card className="text-center mx-2 my-2">
            <Card.Header as="h1">Hi {username}</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to WorkSpace</Card.Title>
              <Card.Text>
                Click the button below to track your first friend for your
                Projects
              </Card.Text>
              <Button variant="primary" to="*/friend-find" as={Link}>
                Find your friend
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    else
      return (
        <>
          <div>
            <h5 className="text-center">{`Friend List (${friends.length})`}</h5>
            <div className="friend-window-space">
              {console.log("re-render")}
              {friends.map((friend) => {
                const isHave = preMembers.find((member) => {
                  return friend._id == member._id;
                });
                return (
                  <Container
                    key={friend._id}
                    className="my-2 justify-content-between"
                  >
                    <SingleFriend
                      friend={friend}
                      setMember={setMember}
                      isHave={isHave}
                      removeMember={removeMember}
                    />
                    <div className="dropdown-divider"></div>
                  </Container>
                );
              })}
            </div>
          </div>
          <div>
            <h5 className="text-center">{`Member(${preMembers.length})`}</h5>
            {preMembers.map((member) => {
              const memberInfo = member.recipient
                ? member.recipient
                : member.requester;

              return (
                <div key={member._id} className="member-info">
                  <img
                    src={`http://localhost:5000/images/${memberInfo.avatar}`}
                    className="member-avatar"
                  />
                  <a className="member-name">{memberInfo.username}</a>
                </div>
              );
            })}
          </div>
        </>
      );
  }
  console.log(preMembers);
  return (
    <Modal
      show={showAddMembersModal}
      onHide={closeDialog}
      dialogClassName="friend-window-modal"
      size="sm"
    >
      <Modal.Header closeButton>
        <h5 className="friend-window-modal-title">Add your members</h5>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group name="image" value={image}>
            <FriendList />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Confirm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddMembersModal;
