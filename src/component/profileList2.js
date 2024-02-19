import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./profileList.css";
import ProfilePreview from './ProfilePreview';

const ProfilesList = () => {
    const [profiles, setProfiles] = useState([]);
    const [userData, setUserData] = useState(null);
    const [unique, setUnique] = useState();
    const [selectedGender, setSelectedGender] = useState('');
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredReligion, setEnteredReligion] = useState('');
    const [enteredMaxIncome, setEnteredMaxIncome] = useState('');
    const [enteredMinAge, setEnteredMinAge] = useState('');
    const [enteredMaxAge, setEnteredMaxAge] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [profilesPerPage] = useState(8);
    const [showResume, setShowResume] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('/get-profiles');
                setProfiles(response.data);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, []);

    const handleViewDetails = async (userId) => {
        try {
            const response = await axios.get(`/get-profiles/${userId}/details`);
            const userdetails = response.data;
            setUnique(userId);
            setUserData(userdetails);
            setShowDetails(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }; 

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedUserId(null);
    };

    const handleShowResume = async (userId) => {
        try {
            const response = await axios.get(`/get-profiles/${userId}/details`);
            setUserData({ resumeUrl: response.data.resume });
            setSelectedUserId(userId);
            setShowResume(true);
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    const handleCloseResume = () => {
        setShowResume(false);
        setSelectedUserId(null);
    };

    // Filter profiles based on gender, first name, location, religion, income, and age range
    const filteredProfiles = profiles.filter(profile => {
        const matchesGender = selectedGender === '' || profile.gender === selectedGender;
        const matchesFirstName = enteredFirstName === '' || profile.firstName.toLowerCase().includes(enteredFirstName.toLowerCase());
        const matchesLocation = enteredLocation === '' || profile.location.toLowerCase().includes(enteredLocation.toLowerCase());
        const matchesReligion = enteredReligion === '' || profile.religion.toLowerCase().includes(enteredReligion.toLowerCase());
        const matchesMaxIncome = enteredMaxIncome === '' || profile.income <= parseInt(enteredMaxIncome);
        const matchesMinAge = enteredMinAge === '' || profile.age >= parseInt(enteredMinAge);
        const matchesMaxAge = enteredMaxAge === '' || profile.age <= parseInt(enteredMaxAge);
        return matchesGender && matchesFirstName && matchesLocation && matchesReligion && matchesMaxIncome && matchesMinAge && matchesMaxAge;
    });

    // Pagination
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="profiles-container">
            {/* Filters */}
            <div className="filters">
                <div className="gender-filter">
                    <button onClick={() => setSelectedGender('male')}>Male</button>
                    <button onClick={() => setSelectedGender('female')}>Female</button>
                </div>
                <div className="name-filter">
                    <input
                        type="text"
                        placeholder="Enter First Name"
                        value={enteredFirstName}
                        onChange={(e) => setEnteredFirstName(e.target.value)}
                    />
                </div>
                <div className="location-filter">
                    <input
                        type="text"
                        placeholder="Enter Location"
                        value={enteredLocation}
                        onChange={(e) => setEnteredLocation(e.target.value)}
                    />
                </div>
                <div className="religion-filter">
                    <input
                        type="text"
                        placeholder="Enter Religion"
                        value={enteredReligion}
                        onChange={(e) => setEnteredReligion(e.target.value)}
                    />
                </div>
                <div className="income-filter">
                    <input
                        type="number"
                        placeholder="Max Income"
                        value={enteredMaxIncome}
                        onChange={(e) => setEnteredMaxIncome(e.target.value)}
                    />
                </div>
                <div className="age-filter">
                    <input
                        type="number"
                        placeholder="Min Age"
                        value={enteredMinAge}
                        onChange={(e) => setEnteredMinAge(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Age"
                        value={enteredMaxAge}
                        onChange={(e) => setEnteredMaxAge(e.target.value)}
                    />
                </div>
            </div>

            {/* Profiles Cards */}
            {currentProfiles.map((profile, index) => (
                <div className="profile-card" key={index}>
                    <div className="profile-details">
                        <img src={`http://localhost:5000/${encodeURIComponent(profile.profilePicture)}`} alt="Profile" style={{ width: '140px', height: '140px', borderRadius:"50%", textAlign:"center" }} />
                        <h3>{profile.firstName}</h3>
                        <p>Gender: {profile.gender}</p>
                        <p>Age: {profile.age}</p>
                        <p>Income: {profile.income}</p>
                        <p>Contact No.: {profile.mobile}</p>
                        <p>Location: {profile.location}</p>
                        <p>Religion: {profile.religion}</p>
                        <p>Id: {profile._id}</p>
                        <div className="details-container">
                            {!showDetails && (
                                <button onClick={() => handleViewDetails(profile._id)}>Show Details</button>
                            )}
                            {unique === profile._id && showDetails && (
                                <ProfilePreview formData={userData} />
                            )}
                            {showDetails && (
                                <button onClick={handleCloseDetails}>Close Details</button>
                            )}
                        </div>
                        {!showDetails && (
                            <button onClick={() => handleShowResume(profile._id)}>Show Biodata</button>
                        )}
                        {userData && userData.resumeUrl && selectedUserId === profile._id && showResume && (
                            <div className="resume-container">
                                <iframe src={`http://localhost:5000/${encodeURIComponent(userData.resumeUrl)}`} style={{ width: '100%', height: '500px' }} />
                                <button onClick={handleCloseResume}>Close Biodata</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Pagination */}
            <div className="pagination">
                <ul>
                    {Array.from({ length: Math.ceil(filteredProfiles.length / profilesPerPage) }).map((_, index) => (
                        <li key={index}>
                            <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfilesList;
