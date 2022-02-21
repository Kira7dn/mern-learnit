import MainModal from "./component/MainModal";

function AddMembersModal({ updatedPost, setUpdatedPost }) {
  return (
    <MainModal setUpdatedPost={setUpdatedPost} updatedPost={updatedPost} />
  );
}
export default AddMembersModal;
