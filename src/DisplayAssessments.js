import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:8082/assessment";

function DisplayAssessments() {
    const [assessments, setAssessments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Adjust as needed

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await axios.get(API_URL);
                setAssessments(response.data);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            }
        };

        fetchAssessments();
    }, []);

    const STATUS_COLORS = {
        Approved: 'green',
        Pending: 'orange',
    };

    const totalPages = Math.ceil(assessments.length / itemsPerPage);

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => {
            const newPage = prevPage + direction;
            return newPage > 0 && newPage <= totalPages ? newPage : prevPage;
        });
    };

    const displayedAssessments = assessments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Product IT Assessment</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>SRL No</th>
                        <th>Set Name</th>
                        <th>Created By</th>
                        <th>Domain</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedAssessments.map((assessment, index) => (
                        <tr key={assessment.setId}>
                            <td>{assessment.setId}</td>
                            <td>{assessment.setName}</td>
                            <td>{assessment.createdBy}</td>
                            <td>{assessment.domain}</td>
                            <td style={{ color: STATUS_COLORS[assessment.status] }}>
                                {assessment.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DisplayAssessments;
