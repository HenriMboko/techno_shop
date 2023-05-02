import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handlelogOut = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Tech Shop</Navbar.Brand>
          <Nav className="mr-auto">
            {user ? (
              <>
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
                <NavDropdown title={user.name} id="user">
                  <Container>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                    <NavDropdown.Item 
                    onClick={handlelogOut}>Logout</NavDropdown.Item>
                  </Container>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
