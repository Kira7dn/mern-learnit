import { Button, Container } from "react-bootstrap";
import { FriendContext } from "../../../contexts/FriendContext";
import { useContext } from "react";

const FindActionButton = ({ _id }) => {
  const {
    friendState: { friend, friends, friendsLoading, users },
    getFriends,
    getUsers,
    addFriend,
  } = useContext(FriendContext);

  let body = null;
  body = (
    <>
      <Button
        size="sm"
        variant="primary"
        className="friend-action-btn"
        onClick={addFriend.bind(this, _id)}
      >
        Add friend
      </Button>
    </>
  );
  return <>{body}</>;
};
export default FindActionButton;
