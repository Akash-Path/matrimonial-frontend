import axios from 'axios';
import React, { useState } from 'react';
import ProfilePreview from './ProfilePreview';

const ProfileCreation = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/create-profile', formData);
        console.log(response.data);
        setShowPreview(true);
      } catch (error) {
        console.error('Error creating profile:', error);
      }
  };

  return (
    <div>
      <h2>Create Profile</h2>
      {!showPreview ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <button type="submit">Preview Profile</button>
        </form>
      ) : (
        <ProfilePreview formData={formData} setShowPreview={setShowPreview} />
      )}
    </div>
  );
};

export default ProfileCreation;
