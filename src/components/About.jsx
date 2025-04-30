import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const About = () => {
    return (
        <Col md={10} lg={8} className="mx-auto">
            <Card className="shadow-sm p-4 p-md-5 about-card">
                <Card.Body>
                    <Card.Title as="h2" className="mb-4 text-primary">About Daily Reflections</Card.Title>
                    <Card.Text className="lead">
                        Welcome to Daily Reflections, a small corner of the web dedicated to capturing moments, thoughts, and adventures, one day at a time.
                    </Card.Text>
                    <Card.Text>
                        This project started as a way to practice web development skills, combining HTML, CSS (with Bootstrap), and JavaScript to create a simple, dynamic blog viewing experience. It has now been converted to React!
                    </Card.Text>
                    <hr className="my-4" />
                    <h5 className="mb-3">Features:</h5>
                    <ul>
                        <li>Browse posts by day using the dropdown.</li>
                        <li>Search through post titles and content.</li>
                        <li>View posts in a fullscreen modal for easy reading.</li>
                        <li>Add new posts (frontend state only).</li>
                        <li>Add comments to posts (frontend state only).</li>
                        <li>Responsive design powered by React Bootstrap 5.</li>
                        <li>Component-based architecture using React.</li>
                        <li>Routing handled by React Router.</li>
                        <li>State management with React Hooks.</li>
                    </ul>
                    <Card.Text>
                        Feel free to explore the website and see how it all works!
                    </Card.Text>
                    <footer className="blockquote-footer mt-3">
                        Created by <cite title="Source Title">Rajan</cite>
                    </footer>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default About; 