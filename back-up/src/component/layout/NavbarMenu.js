import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="sm" bg="primary" variant="dark" className="shadow">
      <Container fluid>
        <Navbar.Brand href="#" className="font-weight-bolder text-white">
          <img
            src={learnItLogo}
            alt="learnItLogo"
            width="auto"
            height="32"
            className="mr-2"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/dashboard"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/work-space"
              as={Link}
            >
              Work-Space
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              About
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/user-info"
              as={Link}
            >
              User
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/friend"
              as={Link}
            >
              Friend
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome {username}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
