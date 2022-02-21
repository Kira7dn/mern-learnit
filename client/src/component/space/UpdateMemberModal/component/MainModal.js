import { Form, Modal, Button } from "react-bootstrap";
import FriendList from "./FriendList";
import MemberList from "./MemberList";
import { SpaceContext } from "../../../../contexts/SpaceContext";
import { useContext, useEffect, useState } from "react";

const MainModal = ({ updatedPost, setUpdatedPost }) => {
  // Use context
  const {
    showAddMembersModal,
    setShowAddMembersModal,
    // preMembers,
    // setPreMembers,
  } = useContext(SpaceContext);
  const { members } = updatedPost;
  const [preMembers, setPreMembers] = useState(members);
  useEffect(() => setPreMembers(members), [members]);
  // Var function
  const closeDialog = () => {
    resetAddMembersData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setUpdatedPost({ ...updatedPost, members: preMembers });
    setShowAddMembersModal(false);
  };
  const resetAddMembersData = () => {
    setPreMembers(members);
    setShowAddMembersModal(false);
  };
  return (
    <div>
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
            <FriendList preMembers={preMembers} setPreMembers={setPreMembers} />
            <MemberList preMembers={preMembers} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog} size="sm">
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MainModal;
