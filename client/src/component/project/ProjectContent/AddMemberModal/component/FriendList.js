import { Container } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import { FriendContext } from "../../../../../contexts/FriendContext";
import { AuthContext } from "../../../../../contexts/AuthContext";
import SingleFriend from "./SingleFriend";
const FriendList = ({ preMembers, setPreMembers }) => {
  const {
    authState: {
      user: { friends },
    },
  } = useContext(AuthContext);
  // const { preMembers } = useContext(ProjectContext);
  return (
    <div>
      <h5 className="text-center">{`Friend List (${friends.length})`}</h5>
      <div className="friend-window-space">
        {friends.map((friend) => {
          const isHave = preMembers.find((member) => {
            return friend._id === member._id;
          });
          return (
            <Container
              key={friend._id}
              className="my-2 justify-content-between"
            >
              <SingleFriend
                preMembers={preMembers}
                setPreMembers={setPreMembers}
                friend={friend}
                isHave={isHave}
              />
              <div className="dropdown-divider"></div>
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export default FriendList;
