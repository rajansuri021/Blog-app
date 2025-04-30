import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const PostCard = ({ post, handleCardClick, handleDelete }) => {
    const imageCount = post.images ? post.images.length : 0;
    const commentCount = post.comments ? post.comments.length : 0;

    const handleMainClick = () => {
        handleCardClick(post); // Pass the whole post object
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent card click when delete is clicked
        handleDelete(post.day);
    };

    // Make card clickable via keyboard
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMainClick();
        }
    };

    return (
        <Col md={11} lg={9} className="mb-4">
            {/* Add tabindex=0 to make the outer div focusable for keyboard navigation */}
            <div className="blog-post-card" data-day={post.day} tabIndex={0} onKeyDown={handleKeyDown}>
                {/* Main content area triggers modal */}
                <div role="button" className="post-card-main-content" onClick={handleMainClick}>
                    <h2 className="card-title" style={{ color: 'var(--primary-color)' }}>{post.title}</h2>
                    {post.content && post.content.length > 0 && (
                        <p className="text-muted">{post.content[0].substring(0, 150)}...</p>
                    )}
                    <div className="d-flex justify-content-between text-muted small mt-3">
                        <span><i className="bi bi-images me-1"></i> {imageCount} Images</span>
                        <span><i className="bi bi-chat-dots me-1"></i> {commentCount} Comments</span>
                        <span>Click to read more...</span>
                    </div>
                </div>

                {/* Delete button outside the main clickable area */}
                <div className="text-end mt-2">
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleDeleteClick}
                        className="delete-post-btn" // Keep class for potential styling/selection
                        aria-label={`Delete post for Day ${post.day}`}
                    >
                        <i className="bi bi-trash"></i> Delete
                    </Button>
                </div>
            </div>
        </Col>
    );
}

export default PostCard; 