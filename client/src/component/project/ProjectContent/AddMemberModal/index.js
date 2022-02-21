import { Form, Modal, Button } from "react-bootstrap";
import FriendList from "./component/FriendList";
import MemberList from "./component/MemberList";
import { ProjectContext } from "../../../../contexts/ProjectContext";
import { useContext, useState } from "react";

const AddMemberModal = ({ members }) => {
  // Use context
  const {
    projectState: { project },
    showAddMembersModal,
    setShowAddMembersModal,
    updateProject,
  } = useContext(ProjectContext);
  const [preMembers, setPreMembers] = useState(members);
  // Var function
  const closeDialog = () => {
    resetAddMembersData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const updatedProject = { _id: project._id, members: preMembers };
    updateProject(updatedProject);
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
            <MemberList preMembers={preMembers} setPreMembers={setPreMembers} />
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
export default AddMemberModal;
