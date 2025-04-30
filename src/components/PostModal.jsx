import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PostModal = ({ show, handleClose, post, handleAddComment }) => {
    const [commentText, setCommentText] = useState('');

    if (!post) {
        return null; // Don't render if no post is selected
    }

    const hasImages = post.images && post.images.length > 0;
    const hasComments = post.comments && post.comments.length > 0;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            handleAddComment(post.day, commentText.trim());
            setCommentText(''); // Clear the textarea
        }
    };

    return (
        <Modal show={show} onHide={handleClose} fullscreen={true} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{post.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Post Content */}
                {post.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}

                <hr className="my-4" />

                {/* Image Gallery */}
                {hasImages && (
                    <>
                        <h6 className="text-muted mb-3">Gallery</h6>
                        <Row xs={2} md={3} lg={4} className="g-2 mb-4">
                            {post.images.map((imageUrl, index) => (
                                <Col key={index}>
                                    <img
                                        src={imageUrl}
                                        alt={`Image ${index + 1} for ${post.title}`}
                                        className="img-fluid rounded blog-modal-image"
                                    />
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

                {/* Comments Section */}
                <hr className="my-4" />
                <h5 className="mb-3">Comments</h5>
                <div id="modalPostComments" className="mb-4 p-3 border rounded bg-light" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {hasComments ? (
                        post.comments.map((comment, index) => (
                            <div key={index} className="mb-2 pb-2 border-bottom">
                                <strong className="d-block" style={{ color: 'var(--primary-color)' }}>{comment.user || 'Anonymous'}</strong>
                                <small>{comment.text}</small>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted fst-italic">No comments yet.</p>
                    )}
                </div>

                {/* Comment Form */}
                <h6>Leave a Comment:</h6>
                <Form onSubmit={handleCommentSubmit}>
                    <Form.Group className="mb-3" controlId="commentText">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Write your comment here..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Submit Comment
                    </Button>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PostModal; 