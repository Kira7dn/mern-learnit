import FriendActionButtons from "./FriendActionButtons";
const SingleFriend = ({ friend: { _id, status, recipient, requester } }) => {
  const avatarPath = `http://localhost:5000/images/${
    recipient ? recipient.avatar : requester.avatar
  }`;
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
          <FriendActionButtons _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default SingleFriend;
