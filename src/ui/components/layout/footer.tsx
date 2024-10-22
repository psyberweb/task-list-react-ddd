import React from 'react';
import Menu from './menu';

const FooterLayout: React.FC = () => {
    return (
        <>
        <Menu id="footer" />
        <p> &copy; 2024 Task List</p>
        </>
    );
};

export default FooterLayout;