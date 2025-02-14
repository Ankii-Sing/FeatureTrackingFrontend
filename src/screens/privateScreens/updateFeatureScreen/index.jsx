import React, { useState, useEffect,useContext } from 'react';
import axios from "axios";
// import UserContext from "../../../store/userContext";
import fetchUsers from './API/allUsers';
import { useLocation } from "react-router-dom"; // useLocation hook
// import setUsers from ''

const UpdateFeatureScreen = () => {
    // const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const { feature, featureId } = location.state || {};

    console.log("feature is", feature);

    useEffect(() => {
       setUsers(fetchUsers());
        console.log("users are", users);

        fetchFeatureData();
    }, []);

    // const fetchFeatureData = async () => {
    //     // Replace with actual API call
    //     const data = await fetch('/api/feature').then(res => res.json());
    //     setFeature(data);
    // };

    const handleUpdate = () => {
        // Handle the update logic here
        console.log('Feature updated:', feature);
    };

    // if (!feature) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <h1>Update Feature</h1>
            <form onSubmit={handleUpdate}>
                <label>
                    Feature Name:
                    <input
                        type="text"
                        value={feature.name}
                        onChange={(e) => setFeature({ ...feature, name: e.target.value })}
                    />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateFeatureScreen;