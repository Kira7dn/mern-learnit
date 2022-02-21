import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { SpaceContext } from "../../../../contexts/SpaceContext";

const SingleFriend = ({ friend, isHave, setPreMembers, preMembers }) => {
  const { _id, recipient, requester } = friend;
  // const { setPreMembers, preMembers } = useContext(SpaceContext);
  const avatarPath = `http://localhost:5000/images/${
    recipient ? recipient.avatar : requester.avatar
  }`;
  const [btnState, setBtnState] = useState(isHave);
  const removeMember = (_id) => {
    setPreMembers(preMembers.filter((member) => member._id !== _id));
  };
  const setMember = (newMembers) => {
    setPreMembers([...preMembers, newMembers]);
  };
  const handleChange = () => {
    if (btnState) {
      removeMember(_id);
    } else {
      setMember(friend);
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
        </div>
      </div>
    </div>
  );
};

export default SingleFriend;
