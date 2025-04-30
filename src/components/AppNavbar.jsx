import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AppNavbar = ({ searchTerm, handleSearchChange, handleSearchSubmit }) => {
    const location = useLocation();
    return (
        <Navbar expand="lg" fixed="top" className="shadow-sm rounded-3 py-2" style={{ background: '#e0e8f0' }}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ fontFamily: 'var(--secondary-font)', fontSize: '1.5rem', color: 'var(--heading-color)' }}>Daily Reflections</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>About</Nav.Link>
                        <Nav.Link as={Link} to="/new-post" active={location.pathname === '/new-post'}>New Post</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search Posts..."
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-secondary" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar; 