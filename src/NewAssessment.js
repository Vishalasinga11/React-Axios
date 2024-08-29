import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './NewAssessment.css';

const CREATE_URL = "http://localhost:8082/assessment";

function NewAssessment() {
    const [setName, setSetName] = useState("");
    const [domain, setDomain] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAssessment = { 
            setName,
            domain,
            questions: [] 
        };
        try {
            const response = await axios.post(CREATE_URL, newAssessment);
            console.log(response);

            toast.success("Assessment created successfully!");
            if(response.status === 200) {
                navigate(`/display-questions`, { state: { setName: setName, setId: response.data.setId } });
                setSetName("");
                setDomain("");
            }
        } catch (error) {
            console.error("Error creating assessment:", error);
            alert("Failed to create assessment.");
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h1 className='text-center pb-4'>Create Assessment</h1>
            <form onSubmit={handleSubmit}>
                <div className='hello d-flex flex-column'>
                    <div className="d-flex flex-row pb-5">
                        <div className="form-group input-half">
                            <label>Set Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="setName"
                                value={setName}
                                onChange={(e) => setSetName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group input-half">
                            <label htmlFor="domain">Domain</label>
                            <input
                                type="text"
                                className="form-control"
                                id="domain"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default NewAssessment;
