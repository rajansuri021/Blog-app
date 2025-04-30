import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const NewPostForm = ({ handleAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!title.trim() || !content.trim()) {
            setError('Please provide at least a title and content.');
            return;
        }

        // Prepare data for App.jsx handler
        const postData = {
            title: title.trim(),
            // Split content by double newlines and filter empty lines
            content: content.split(/\n\s*\n/).map(p => p.trim()).filter(p => p),
            // Split images by comma and filter empty strings
            images: images.split(',').map(url => url.trim()).filter(url => url)
        };

        handleAddPost(postData); // Call the handler passed from App

        // Clear form (optional)
        // setTitle('');
        // setContent('');
        // setImages('');

        // Redirect back to home page after successful submission
        navigate('/');
    };

    return (
        <Col md={10} lg={8} className="mx-auto">
            <Card className="shadow-sm p-4 p-md-5 new-post-card">
                <Card.Body>
                    <Card.Title as="h2" className="mb-4 text-success">Add a New Reflection</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="postTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postContent">
                            <Form.Label>Content (Paragraphs)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="Enter post content. Add blank lines between paragraphs."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter each paragraph on a new line. Blank lines will separate them.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postImages">
                            <Form.Label>Image URLs (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URLs, separated by commas"
                                value={images}
                                onChange={(e) => setImages(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                Separate multiple URLs with a comma (,).
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Reflection
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default NewPostForm; 