import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';

const ProfilesList = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
      const fetchProfiles = async () => {
        try {
          console.log("start");
          const response = await axios.get('/get-profiles');
          console.log("end");
          setProfiles(response.data);
        } catch (error) {
          console.error('Error fetching profiles:', error);
        }
      };
  
      fetchProfiles();
    }, []);
  return (
    <div>
      <h2>Profiles</h2>
      {profiles.map((profile, index) => (
        <div key={index}>
          <h3>{profile.name}</h3>
          <p>Age: {profile.age}</p>
          <p>Gender: {profile.gender}</p>
          <p>Location: {profile.location}</p>
          {/* Display other profile details */}
        </div>
      ))}
    </div>
  );
};

export default ProfilesList;
