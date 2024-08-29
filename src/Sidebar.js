import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'

function Sidebar() {
    return (
        <div id="yoyo" className="d-flex flex-column vh-100 bg-dark text-white p-3 justify-content-center">
            <Link to="/display-sets" className="btn btn-light mb-3 w-100 text-center me-2 hi">Dashboard</Link>
            <Link to="/create-assessment" className="btn btn-light mb-3 w-100 text-center me-2 hi">Create Assessment</Link>
        </div>
    );
}

export default Sidebar;
