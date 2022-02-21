import { Form, Card, Container, Modal, Button } from "react-bootstrap";

const Modal = () => {
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
            <FriendList />
            <MemberList />
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
    </div>
  );
};

export default Modal;
