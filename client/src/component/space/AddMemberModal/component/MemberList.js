import { useContext } from "react";
import { SpaceContext } from "../../../../contexts/SpaceContext";

const Memberlist = () => {
  const { preMembers } = useContext(SpaceContext);

  return (
    <div>
      <div className="member-list-window">
        <h5 className="text-center">{`Member(${preMembers.length})`}</h5>
        {preMembers.map((member) => {
          const memberInfo = member.recipient
            ? member.recipient
            : member.requester;
          return (
            <div key={member._id} className="member-info">
              <img
                src={`http://localhost:5000/images/${memberInfo.avatar}`}
                className="member-avatar"
              />
              <a className="member-name">{memberInfo.username}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memberlist;
