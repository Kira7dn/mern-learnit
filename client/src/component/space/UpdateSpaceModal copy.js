import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { SpaceContext } from "../../contexts/SpaceContext";
import StarRatings from "react-star-ratings";
import addBtn from "../../assets/addBtn.svg";
import UpdateMemberModal from "./UpdateMemberModal";

const UpdateSpaceModal = () => {
  // Context
  const {
    spaceState: { space },
    showUpdateSpaceModal,
    setShowUpdateSpaceModal,
    spaceAvatars,
    updateSpace,
    setShowToast,
    setShowAddMembersModal,
  } = useContext(SpaceContext);
  // State
  const [updatedPost, setUpdatedPost] = useState(space);
  useEffect(() => setUpdatedPost(space), [space]);
  const { title, description, rank, image, members } = updatedPost;
  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    setShowUpdateSpaceModal(false);
    setUpdatedPost(space);
    // resetAddPostData();
  };
  console.log(updatedPost);
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateSpace(updatedPost);
    setShowUpdateSpaceModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
    // resetAddPostData();
  };
  // const resetAddPostData = () => {
  //   setUpdatedPost({
  //     title: "",
  //     description: "",
  //     rank: 1,
  //     image: "http://localhost:5000/images/default-space.jpg",
  //     members: [],
  //   });
  //   setShowUpdateSpaceModal(false);
  // };
  // StarRating Component
  const changeRating = (rating) => {
    setUpdatedPost({ ...updatedPost, rank: rating });
  };
  const StarRating = () => {
    return (
      <div className="page-wrap">
        <div>
          <StarRatings
            rating={rank}
            isSelectable={true}
            starRatedColor={"blue"}
            changeRating={changeRating}
            numberOfStars={5}
            starDimension={"20px"}
            starSpacing={"2px"}
          />
        </div>
      </div>
    );
  };
  return (
    <Modal show={showUpdateSpaceModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making Progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="my-2">
            <Form.Group
              name="image"
              onChange={onChangeUpdatedPostForm}
              value={image}
              className="d-flex"
            >
              <div className="avatar-container col-4">
                <img src={updatedPost.image} className="space-img" alt="" />
              </div>
              <div className="col-8">
                <p>Choose space avatar: </p>
                <div className="mb-3 cc-selector avatar-list-container ">
                  {spaceAvatars.map((spaceAvatar, index) => (
                    <div key={index}>
                      <input
                        id={`avatar-${index}`}
                        type="radio"
                        name="image"
                        value={spaceAvatar}
                      />
                      <label
                        className="drinkcard-cc avatar-thumb"
                        htmlFor={`avatar-${index}`}
                        style={{
                          backgroundImage: "url(" + spaceAvatar + ")",
                        }}
                      ></label>
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Row>
              <Col className="col-4">
                <Form.Label>Rating</Form.Label>
                <StarRating />
              </Col>
              <Col>
                <Row>
                  <div className="col-10">
                    <Form.Label className="text-center">{`Member(${
                      members.length || 0
                    })`}</Form.Label>
                    <div className="member-list-info">
                      {members.map((member) => {
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
                  <div className="col-2 addFriendbtn">
                    <Button onClick={setShowAddMembersModal.bind(this, true)}>
                      <img src={addBtn} alt="add-post" width="20" height="20" />
                    </Button>
                  </div>
                </Row>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
      <UpdateMemberModal
        setUpdatedPost={setUpdatedPost}
        updatedPost={updatedPost}
      />
    </Modal>
  );
};

export default UpdateSpaceModal;
