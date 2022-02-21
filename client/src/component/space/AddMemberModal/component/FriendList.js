import { Container } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SpaceContext } from "../../../../contexts/SpaceContext";
import { FriendContext } from "../../../../contexts/FriendContext";
import SingleFriend from "./SingleFriend";
const FriendList = () => {
  const {
    friendState: { friends },
    getFriends,
  } = useContext(FriendContext);
  useEffect(() => getFriends(), []);
  const { preMembers } = useContext(SpaceContext);
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
              <SingleFriend friend={friend} isHave={isHave} />
              <div className="dropdown-divider"></div>
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export default FriendList;
