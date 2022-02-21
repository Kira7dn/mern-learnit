import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FriendNavbar = () => {
  return (
    <Container className="my-2 justify-content-center d-flex">
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link className="friend-nav-btn" eventKey="/" to="*/" as={Link}>
            Friends
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="friend-nav-btn"
            eventKey="*/friend-find"
            to="*/friend-find"
            as={Link}
          >
            Search
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="friend-nav-btn"
            eventKey="*/friend-pending"
            to="*/friend-pending"
            as={Link}
          >
            Pending
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default FriendNavbar;
