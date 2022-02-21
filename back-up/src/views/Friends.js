import { AuthContext } from "../contexts/AuthContext";
import { FriendContext } from "../contexts/FriendContext";
import { useContext, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useMatch,
  Link,
} from "react-router-dom";

import { Row, Container, Col, Button, Card, Spinner } from "react-bootstrap";
import FriendNavbar from "../component/friend/FriendNavBar";
import SingleFriend from "../component/friend/friendList/SingleFriend";
import SingleUser from "../component/friend/findUser/SingleUser";
import SinglePending from "../component/friend/pending/SinglePending";
const Friend = (props) => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    friendState: { friends, friendsLoading, users, pendings },
    getFriends,

    getUsers,
  } = useContext(FriendContext);
  // Start: Get all posts + Friend
  useEffect(() => getFriends(), []);
  useEffect(() => getUsers(), []);
  let body = null;
  // Component
  function FriendList(props) {
    if (friends.length < 1)
      return (
        <div className="friend-window">
          <Card className="text-center mx-2 my-2">
            <Card.Header as="h1">Hi {username}</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to WorkSpace</Card.Title>
              <Card.Text>
                Click the button below to track your first friend for your
                Projects
              </Card.Text>
              <Button variant="primary" to="*/friend-find" as={Link}>
                Find your friend
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    else
      return (
        <>
          <h5 className="text-center">Friend List (14)</h5>
          <div className="friend-window">
            {friends.map((friend) => (
              <Container
                key={friend._id}
                className="my-2 justify-content-between"
              >
                <SingleFriend friend={friend} />
                <div className="dropdown-divider"></div>
              </Container>
            ))}
          </div>
        </>
      );
  }
  function FriendFind() {
    return (
      <>
        <h5 className="text-center">Users List()</h5>
        <div className="friend-window">
          {users.map((user) => (
            <Container key={user._id} className="my-2 justify-content-between">
              <SingleUser user={user} />
              <div className="dropdown-divider"></div>
            </Container>
          ))}
        </div>
      </>
    );
  }
  function FriendPending() {
    return (
      <>
        <h5 className="text-center">Pending</h5>
        <div className="friend-window">
          {pendings
            .sort((a) => (a.recipient ? 1 : -1))
            // .filter((friend) => friend.requester)
            .map((friend) => (
              <Container
                key={friend._id}
                className="my-2 justify-content-between"
              >
                <SinglePending friend={friend} />
                <div className="dropdown-divider"></div>
              </Container>
            ))}
        </div>
      </>
    );
  }

  if (friendsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    body = (
      <>
        <Row className="row-col-1 row-cols-md-3 g-4 mx-auto mt-3 justify-content-center">
          <Col className="my-2">
            <Card
              className="shadow m-4 px-2"
              border="success"
              style={{
                cursor: "default",
              }}
              // scrollable={true}
            >
              <FriendNavbar />
              <Routes>
                <Route path="/" element={<FriendList />}></Route>
                <Route path="*/" element={<FriendList />}></Route>
                <Route path="*/friend-find" element={<FriendFind />}></Route>
                <Route
                  path="*/friend-pending"
                  element={<FriendPending />}
                ></Route>
              </Routes>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  return <>{body}</>;
};

export default Friend;
