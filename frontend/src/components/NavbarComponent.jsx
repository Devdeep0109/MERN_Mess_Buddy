import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from "js-cookie";
import { useContext } from 'react';
import UserContext from '../UseContext';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
  const navigate = useNavigate()

  const {user, setUser} = useContext(UserContext);
  console.log(user.state);
  const handleLogout = ()=>{
    Cookies.remove("token");
  setUser({  name : "",
    id: "",
    email: "",
    state: false})
    navigate('/signin')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Mess-Buddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user.state ? <Nav.Link onClick={() => navigate('/addmess')}>Add Mess</Nav.Link> : 
             <Nav.Link onClick={() => navigate('/signup')}>SignUp</Nav.Link> }
               <NavDropdown title={user.name} id="basic-nav-dropdown">
              
              <NavDropdown.Item href="" onClick={() => handleLogout()}>
                Logout
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;