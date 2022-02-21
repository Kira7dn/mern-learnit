import { useContext } from "react";
import { SpaceContext } from "../../../../../contexts/SpaceContext";

const Memberlist = ({ preMembers, setPreMembers }) => {
  return (
    <div>
      <div className="member-list-window">
        <h5 className="text-center">{`Member(${preMembers.length})`}</h5>
        {preMembers.map((member, index) => {
          return (
            <div key={index} className="member-info">
              <img
                src={`http://localhost:5000/images/${member.avatar}`}
                className="member-avatar"
              />
              <a className="member-name">{member.username}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memberlist;
