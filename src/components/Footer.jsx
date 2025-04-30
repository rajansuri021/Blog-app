import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    // No need for interval, year changes rarely
    return (
        <footer className="footer mt-auto py-3 bg-light border-top">
            <Container className="text-center">
                <span className="text-muted">© {year} Daily Reflections. All Rights Reserved.</span>
            </Container>
        </footer>
    );
}

export default Footer; 