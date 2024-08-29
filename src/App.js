import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import DisplayAssessments from './DisplayAssessments';
import NewAssessment from './NewAssessment';
import AddQuestions from './AddQuestions';

function App() {
    return (
        <Router>
            <div className="d-flex">
                <Sidebar />
                <div className="container-fluid">
                    <Routes>
                        <Route path="/display-sets" element={<DisplayAssessments />} />
                        <Route path="/create-assessment" element={<NewAssessment />} />
                        <Route path="/display-questions" element={<AddQuestions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
