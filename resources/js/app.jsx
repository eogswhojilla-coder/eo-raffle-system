import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './app/redux/store';
import Dashboard from './app/pages/Dashboard/page';
import Registration from './app/pages/Registration/page';
import Draw from './app/pages/Draw/page';
import '../css/app.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                {/* Toast Notification Container */}
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                            fontSize: '16px',
                            padding: '16px',
                            borderRadius: '8px',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/draw" element={<Draw />} />
                </Routes>
            </Router>
        </Provider>
    );
};

// Mount React to DOM
const root = createRoot(document.getElementById('app'));
root.render(<App />);