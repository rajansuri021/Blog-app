import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import initialBlogPosts from './data.js';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import NewPostForm from './components/NewPostForm';
import PostModal from './components/PostModal';

// --- Placeholder Components (We'll build these out) ---

const NewPost = () => <h2>New Post Page Placeholder</h2>;

// --- Main App Component ---
function App() {
    const location = useLocation();
    const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentModalPost, setCurrentModalPost] = useState(null);

    // Derived state for dropdown options
    const dayOptions = blogPosts
        .sort((a, b) => a.day - b.day)
        .map(post => ({ value: post.day, label: `Day ${post.day}: ${post.title}` }));

    // --- Event Handlers (to be implemented) ---
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // Optional: Clear search results immediately or wait for submit?
        // If waiting, clear search results in handleSearchSubmit or when navigating away
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search submitted:", searchTerm);
        // TODO: Implement search logic
        // 1. Filter blogPosts based on searchTerm
        // 2. Update searchResults state
        // 3. Potentially navigate to a search results view or filter the home view
        // For now, just log
    };

    const handleDaySelectChange = (e) => {
        const day = e.target.value ? parseInt(e.target.value) : null;
        setSelectedDay(day);
        setSearchTerm(''); // Clear search when day is selected
        console.log("Selected day:", day);
        // TODO: Implement logic to display only the selected post or filter home view
    };

    const handlePostCardClick = (post) => {
        setCurrentModalPost(post);
    };

    const handleCloseModal = () => {
        setCurrentModalPost(null);
    };

    const handleAddPost = (newPostData) => {
        const maxDay = blogPosts.reduce((max, post) => Math.max(max, post.day), 0);
        const newPost = {
            ...newPostData,
            day: maxDay + 1,
            comments: [],
            // Ensure content is an array of strings if not already
            content: Array.isArray(newPostData.content) ? newPostData.content : [newPostData.content],
            images: newPostData.images || [],
        };
        setBlogPosts(prevPosts => [...prevPosts, newPost]);
        console.log("Added post:", newPost);
        // Maybe navigate back to home or show a success message?
    };

    const handleDeletePost = (dayToDelete) => {
        if (window.confirm(`Are you sure you want to delete post for Day ${dayToDelete}?`)) {
            setBlogPosts(prevPosts => prevPosts.filter(post => post.day !== dayToDelete));
            console.log("Deleted post:", dayToDelete);
            // Reset selection/search if the deleted post was selected/found
            if (selectedDay === dayToDelete) {
                setSelectedDay(null);
            }
            // Also update search results if needed
            setSearchResults(prevResults => prevResults.filter(post => post.day !== dayToDelete));
        }
    };

    const handleAddComment = (postId, commentText) => {
        if (!commentText) return;
        const newComment = { user: 'You', text: commentText }; // Simple user for now
        setBlogPosts(prevPosts =>
            prevPosts.map(post =>
                post.day === postId
                    ? { ...post, comments: [...post.comments, newComment] }
                    : post
            )
        );
        // Update the post in the modal as well if it's open
        if (currentModalPost && currentModalPost.day === postId) {
            setCurrentModalPost(prevModalPost => ({
                ...prevModalPost,
                comments: [...prevModalPost.comments, newComment]
            }));
        }
        console.log("Comment added to post", postId, newComment);
    };

    // Effect to set RGB color variables (similar to original ui.js)
    useEffect(() => {
        try {
            const computedStyle = getComputedStyle(document.documentElement);
            const primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
            if (primaryColor.startsWith('#')) {
                const r = parseInt(primaryColor.substring(1, 3), 16);
                const g = parseInt(primaryColor.substring(3, 5), 16);
                const b = parseInt(primaryColor.substring(5, 7), 16);
                if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                    document.documentElement.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
                }
            }
            const headingColor = computedStyle.getPropertyValue('--heading-color').trim();
            if (headingColor.startsWith('#')) {
                const r = parseInt(headingColor.substring(1, 3), 16);
                const g = parseInt(headingColor.substring(3, 5), 16);
                const b = parseInt(headingColor.substring(5, 7), 16);
                if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                    document.documentElement.style.setProperty('--heading-color-rgb', `${r}, ${g}, ${b}`);
                }
            }
        } catch (e) {
            console.error("Error processing CSS variables for RGB conversion:", e);
        }
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <AppNavbar
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
            />
            <Container className="main-container">
                {/* Header Section (from original HTML) */}
                <header className="text-center mb-5">
                    <h1>Daily Reflections</h1>
                    <p className="lead text-muted">Select a day below to revisit the moments and thoughts captured.</p>
                </header>

                {/* Day Selector Row (conditional) */}
                {location.pathname === '/' && (
                    <Row className="justify-content-center mb-5">
                        <Col md={8} lg={6} className="selector-area text-center">
                            <Form.Group controlId="daySelect">
                                <Form.Label className="fw-bold mb-2">Choose a Day:</Form.Label>
                                <Form.Select
                                    aria-label="Select a blog post day"
                                    value={selectedDay || ''}
                                    onChange={handleDaySelectChange}
                                >
                                    <option value="">-- Please Select --</option>
                                    {dayOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                )}

                {/* Main Content Area using Routes */}
                <Routes>
                     {/* Pass necessary props down to Home */}
                    <Route path="/" element={<Home posts={blogPosts} selectedDay={selectedDay} searchTerm={searchTerm} handleCardClick={handlePostCardClick} handleDelete={handleDeletePost} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/new-post" element={<NewPostForm handleAddPost={handleAddPost} />} />
                    {/* Add a route for search results maybe? */}
                    {/* <Route path="/search" element={<SearchResults results={searchResults} />} /> */}
                </Routes>
            </Container>
            <Footer />

            {/* Modal (conditionally rendered) */}
            {currentModalPost && (
                <PostModal
                    show={!!currentModalPost}
                    handleClose={handleCloseModal}
                    post={currentModalPost}
                    handleAddComment={handleAddComment}
                />
            )}
        </div>
    );
}

// Add the wrapper component
function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper; // Export the wrapper instead of App
