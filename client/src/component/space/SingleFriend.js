import { Button } from "react-bootstrap";
import { useContext, useState, useEffect, useCallback } from "react";

const SingleFriend = ({
  friend: { _id, status, recipient, requester },
  setMember,
  removeMember,
  isHave,
}) => {
  const avatarPath = `http://localhost:5000/images/${
    recipient ? recipient.avatar : requester.avatar
  }`;
  const displayStyle = isHave ? "none" : "block";

  const [btnState, setBtnState] = useState(isHave);

  const handleChange = () => {
    if (btnState) {
      removeMember(_id);
      console.log("remove");
    } else {
      setMember({
        _id,
        status,
        recipient,
        requester,
      });
      console.log("add");
    }
    setBtnState(!btnState);
  };
  return (
    <div className="friend-container">
      <div className="">
        <img src={avatarPath} className="friend-avatar" />
      </div>
      <div className="friend-info">
        <div>
          <b className="friend-info-name">
            {recipient ? recipient.username : requester.username}
          </b>
        </div>
        <div className="friend-action">
          <Button
            variant={btnState ? "light" : "secondary"}
            onClick={handleChange}
            size="sm"
            className="friend-action-btn"
          >
            {btnState ? "Delete" : "Add"}
          </Button>
          <Button
            style={{ display: isHave ? "none" : "block" }}
            size="sm"
            variant="primary"
            className="friend-action-btn"
            onClick={setMember.bind(this, {
              _id,
              status,
              recipient,
              requester,
            })}
          >
            Add
          </Button>
          <Button
            style={{ display: !isHave ? "none" : "block" }}
            size="sm"
            variant="secondary"
            className="friend-action-btn"
            onClick={removeMember.bind(this, _id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleFriend;
