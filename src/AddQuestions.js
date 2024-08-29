import React, { useState, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import axios from 'axios';

function AddQuestions() {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const { setName } = location.state || {}; 

    //const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!setName) return;

            const GET_QUESTIONS_URL = `http://localhost:8082/assessment/bysetname/${setName}`;
            try {
                const response = await axios.get(GET_QUESTIONS_URL);
                const questionsData = response.data.questions || [];
                setQuestions(questionsData);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [setName]);

    return (
        <div className="container mt-4">
            <h1>Create New Set of Questions</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>SRL No</th>
                        <th>Question</th>
                        <th>Edit Options</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.length > 0 && (
                        questions.map((question, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{question.questionName}</td>
                                <td>
                                    <button className="btn btn-secondary">Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <button className="btn btn-primary">Add Question +</button>
            <button className="btn btn-success ml-2">Save Changes</button>
        </div>
    );
}

export default AddQuestions;
