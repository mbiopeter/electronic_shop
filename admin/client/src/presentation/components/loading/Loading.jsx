import React, { useEffect } from 'react';
import './Loading.css';

const Loader = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <div className="loader-container">
        <div className="loader">
            <ul>
            {Array.from({ length: 12 }, (_, index) => (
                <li key={index}>
                <div></div>
                </li>
            ))}
            </ul>
            <h4>Something cool is about to begin</h4>
        </div>
        </div>
    );
};

export default Loader;
