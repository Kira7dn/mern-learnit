import FindActionButton from "./FindActionButton";

const SingleUser = ({ user: { _id, username, avatar, phone } }) => {
  const avatarPath = `http://localhost:5000/images/${avatar}`;

  return (
    <div className="friend-container">
      <div className="">
        <img src={avatarPath} className="friend-avatar" />
      </div>
      <div className="friend-info">
        <div>
          <b className="friend-info-name">{username}</b>
        </div>
        <div className="friend-action">
          <FindActionButton _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
