import { useState } from 'react'
import './App.css'

import Body from './components/Body/Body'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  const [selectedPage, setSelectedPage] = useState('Home');

  const handlePageChange = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">{import.meta.env.VITE_TITLE}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#home" onClick={() => handlePageChange('Home')}>Home</Nav.Link>
            <Nav.Link href="#aboutme" onClick={() => handlePageChange('About Me')}>About Me</Nav.Link>
            <NavDropdown title="Content" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#videos" onClick={() => handlePageChange('Videos')}>
                Videos
              </NavDropdown.Item>
              
              <NavDropdown.Item href="#articles" onClick={() => handlePageChange('Articles')}>
                Articles
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Body selectedPage={selectedPage} />      
    </>
  )
}

export default App

