import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Row, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import { SpaceContext } from "../../../../contexts/SpaceContext";
import StarRatings from "react-star-ratings";
import AddMembersModal2 from "../../AddMemberModal";
import addBtn from "../../../../assets/addBtn.svg";

const MainModal = () => {
  // COntext
  const {
    showAddSpaceModal,
    setShowAddSpaceModal,
    addSpace,
    setShowToast,
    spaceAvatars,
    showAddMembersModal,
    setShowAddMembersModal,
    setNewPost,
    newPost,
    setPreMembers,
  } = useContext(SpaceContext);
  // State

  const { title, description, image, rank, members } = newPost;
  // StarRating Component
  const changeRating = (rating) => {
    setNewPost({ ...newPost, rank: rating });
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

  const onChangeNewPostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addSpace(newPost);
    console.log(newPost);
    resetAddPostData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      rank: 1,
      image: "http://localhost:5000/images/default-space.jpg",
      members: [],
    });
    setPreMembers([]);
    setShowAddSpaceModal(false);
  };
  const handleChangeAvatar = (event) => {
    image = event.target.value;
  };
  return (
    <Modal show={showAddSpaceModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Create your workspace</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group
            name="image"
            onChange={onChangeNewPostForm}
            value={image}
            className="d-flex"
          >
            <div className="avatar-container col-4">
              <img src={newPost.image} className="space-img" alt="" />
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
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewPostForm}
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
            Add new
          </Button>
        </Modal.Footer>
      </Form>
      <AddMembersModal2 setNewPost={setNewPost} newPost={newPost} />
    </Modal>
  );
};

export default MainModal;
