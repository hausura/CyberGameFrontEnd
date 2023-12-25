import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Header=()=>{

  const {logout ,user} = useContext(UserContext);
  const navigate =useNavigate();
    const handleLogout = () =>{
      logout()
      navigate("/");
      toast.success("Logouted");
    }
    return(
    <Navbar expand="lg" 
    className="bg-body-tertiary" 
    bg='dark'
    data-bs-theme={window.location.pathname === '/login' ? 'dark' :''}> 
    <Container >

      <NavLink to="/" className='navbar-brand'>
              <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              />
          CYBER GAME
      </NavLink>
      { (user && user.auth || window.location.pathname ==='/') &&
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
              <NavLink className='nav-link' to="/">
                  Home
              </NavLink>
              <NavLink className='nav-link' to="/users">
                Manage User
              </NavLink>
          </Nav>

            {user && user.email &&
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  WELCOME:<b>{user.email}</b> 
                </Navbar.Text>
              </Navbar.Collapse>
            } 

            <Nav>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {user && user.auth===true
                  ? <NavDropdown.Item onClick={handleLogout}> Logout </NavDropdown.Item>
                  : <NavLink className=' dropdown-item' to="/login"> Log In</NavLink>
                }
                {/* <NavDropdown.Item onClick={handleLogout}> Logout </NavDropdown.Item>
                <NavLink className=' dropdown-item' to="/login"> Log In</NavLink> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </>
      }
    </Container>
  </Navbar>)
}
export default Header;