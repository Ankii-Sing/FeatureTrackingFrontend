import React from 'react';
const GET_FEATURE_FROM_ID = 'http://localhost:8080/api/public/feature/5';

const FeatureStatus = () => {
    return (
        <div>
            <h1>Feature Status</h1>
            <p>This component will display the status of various features.</p>
        </div>
    );
};

export default FeatureStatus;