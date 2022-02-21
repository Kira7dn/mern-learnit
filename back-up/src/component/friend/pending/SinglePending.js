import PendingActionButtons from "./PendingActionButtons";

const SinglePending = ({ friend: { _id, status, recipient, requester } }) => {
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
          <PendingActionButtons
            _id={_id}
            status={status}
            recipient={recipient}
            requester={requester}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePending;
