import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadableHome, LoadableAbout } from './utils/imports/LoadableComponents';
import ErrorBoundary from './components/hoc/ErrorBoundary';

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<LoadableHome />} />
                        <Route path="/about" element={<LoadableAbout />} />
                    </Routes>
                </ErrorBoundary>
            </Suspense>
        </Router>
    );
};

export default App;
