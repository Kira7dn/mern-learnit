import { Button, Container } from "react-bootstrap";
import { FriendContext } from "../../../contexts/FriendContext";
import { useContext, useEffect } from "react";

const PendingActionButtons = ({ _id, recipient, requester }) => {
  const { deleteFriend, acceptFriend } = useContext(FriendContext);
  let body = null;
  if (requester) {
    body = (
      <>
        <Button
          size="sm"
          variant="primary"
          className="friend-action-btn"
          onClick={acceptFriend.bind(this, _id)}
        >
          Accept
        </Button>
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
  } else if (recipient) {
    body = (
      <>
        <Button
          size="sm"
          variant="light"
          className="friend-action-btn"
          onClick={deleteFriend.bind(this, _id)}
        >
          Reject
        </Button>
      </>
    );
  }
  return <>{body}</>;
};
export default PendingActionButtons;
