import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import PostCard from './PostCard';

const Home = ({ posts, selectedDay, searchTerm, handleCardClick, handleDelete }) => {

    // Filter posts based on selected day or search term
    const filteredPosts = posts.filter(post => {
        if (selectedDay) {
            return post.day === selectedDay;
        }
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const titleMatch = post.title.toLowerCase().includes(lowerSearchTerm);
            const contentMatch = post.content.some(paragraph => paragraph.toLowerCase().includes(lowerSearchTerm));
            return titleMatch || contentMatch;
        }
        return true; // Show all if no selection or search
    });

    const renderContent = () => {
        if (filteredPosts.length === 0) {
            if (searchTerm) {
                return (
                    <Col md={10} lg={8}>
                        <Alert variant="warning" className="text-center py-4">
                            <Alert.Heading><i className="bi bi-search me-2"></i>No Results</Alert.Heading>
                            <p>Sorry, no blog posts matched your search for "{searchTerm}".</p>
                        </Alert>
                    </Col>
                );
            }
            if (selectedDay) { // This case might not happen if dropdown only shows existing days
                return (
                     <Col md={10} lg={8}>
                        <Alert variant="warning" className="text-center py-4">
                           <Alert.Heading><i className="bi bi-exclamation-triangle-fill me-2"></i>Oops!</Alert.Heading>
                           <p>We couldn't find a post for the selected day (Day {selectedDay}).</p>
                        </Alert>
                    </Col>
                );
            }
             if (posts.length === 0) { // Check if there are *any* posts at all
                return (
                    <Col md={10} lg={8}>
                        <Alert variant="secondary" className="text-center py-4">
                            <Alert.Heading>No Posts Yet!</Alert.Heading>
                            <p>Use the "New Post" link to add the first reflection.</p>
                        </Alert>
                    </Col>
                );
             }
             // This case shouldn't be reached if posts exist but filter is empty
             // Maybe return null or a generic message? Let's return null for now.
             return null;
        }

        return filteredPosts.map(post => (
            <PostCard
                key={post.day} // Use day as key assuming it's unique
                post={post}
                handleCardClick={handleCardClick}
                handleDelete={handleDelete}
            />
        ));
    };

    return (
        <Row className="justify-content-center">
            {renderContent()}
        </Row>
    );
}

export default Home; 