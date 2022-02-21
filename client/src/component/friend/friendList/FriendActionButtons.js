import { Button } from "react-bootstrap";
import { useContext } from "react";
import { FriendContext } from "../../../contexts/FriendContext";

const ActionButtons = ({ status, _id, recipient, requester }) => {
  const { deleteFriend } = useContext(FriendContext);
  let body = null;
  body = (
    <>
      <Button
        size="sm"
        variant="light"
        className="friend-action-btn"
        onClick={deleteFriend.bind(this, _id)}
      >
        Delete
      </Button>
    </>
  );
  return <>{body}</>;
};
export default ActionButtons;
